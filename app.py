import base64
import os
import uuid
from datetime import datetime, timedelta

from flask import (
    Flask,
    abort,
    flash,
    redirect,
    render_template,
    request,
    send_from_directory,
    url_for,
)
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from flask_login import (
    LoginManager,
    UserMixin,
    current_user,
    login_required,
    login_user,
    logout_user,
)
from flask_sqlalchemy import SQLAlchemy

# Initialize Flask application and configuration
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB
app.config['REMEMBER_COOKIE_DURATION'] = timedelta(days=1)  # Adjust as needed

# Initialize extensions
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
CORS(app)

login_manager.login_view = 'login'

# Database models
class User(db.Model, UserMixin):
    """
    Represents a user in the application.

    Attributes:
        id (int): The unique identifier for the user.
        username (str): The username of the user (max length: 20 characters).
        email (str): The email address of the user (max length: 120 characters).
        password (str): The hashed password of the user (max length: 60 characters).
        theme (str): The selected theme for the user (max length: 10 characters, default: 'light').
        todos (relationship): A relationship to the Todo model representing user's tasks.
    """
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    theme = db.Column(db.String(10), nullable=False, default='light')  # New column for theme
    todos = db.relationship('Todo', backref='owner', lazy=True)

class Todo(db.Model):
    """
    Defines a Todo class that represents a task with various attributes:
    - id: Integer, primary key
    - title: String, max length 100, not nullable
    - content: Text, not nullable
    - due_date: Date, nullable
    - completed: Boolean, default False
    - postponed: Boolean, default False
    - user_id: Integer, foreign key to user.id, not nullable
    - image_path: String, max length 200, nullable (new column for image path)
    """
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    due_date = db.Column(db.Date, nullable=True)
    completed = db.Column(db.Boolean, default=False)
    postponed = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    image_path = db.Column(db.String(200), nullable=True)  # New column for image path

# Serve static files with appropriate caching
@app.route('/static/<path:filename>')
def static_files(filename):
    '''
    Route for serving static files from the 'static' directory with caching enabled for 1 day.

    Parameters:
    filename (str): The name of the file to be retrieved from the 'static' directory.

    Returns:
    flask.Response: The response object containing the static file with cache control set to 1 day.
    '''
    response = send_from_directory('static', filename)
    response.headers['Cache-Control'] = 'public, max-age=86400'  # Cache for 1 day
    return response

@app.route('/service-worker.js')
def service_worker():
    '''
    Route for serving the service worker JavaScript file.
    Sends the service worker file from the 'static' directory with a cache control header set to cache for 1 year as immutable.
    '''
    response = send_from_directory('static', 'service-worker.js')
    response.headers['Cache-Control'] = 'public, max-age=31536000, immutable'  # Cache for 1 year, immutable
    return response

@login_manager.user_loader
def load_user(user_id):
    """
    Loads a user from the database based on the user ID.

    Parameters:
        user_id (int): The unique identifier of the user.

    Returns:
        User: The user object corresponding to the user ID.
    """
    return User.query.get(int(user_id))

# Home page redirect to login if not authenticated
@app.route('/')
def home():
    '''
    Route for the home page.
    Redirects to the dashboard if the current user is authenticated, otherwise redirects to the login page.
    '''
    return redirect(url_for('dashboard')) if current_user.is_authenticated else redirect(url_for('login'))

# Register page
@app.route('/register', methods=['GET', 'POST'])
def register():
    """
    Registers a new user in the application.

    Handles GET and POST requests to '/register' route. If a POST request is received, 
    it extracts username, email, and password from the form data, hashes the password, 
    creates a new User instance, adds it to the database, and redirects to the login page 
    after displaying a success message. For GET requests, renders the 'register.html' template.

    Returns:
        str: A redirect response to the login page or the rendered 'register.html' template.
    """
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        user = User(username=username, email=email, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        flash('Your account has been created!', 'success')
        return redirect(url_for('login'))
    return render_template('register.html')

# Login page
@app.route('/login', methods=['GET', 'POST'])
def login():
    """
    Defines the login route for the application.

    Handles GET and POST requests for user login. 
    If a POST request is received, it validates the user's credentials and logs the user in if successful.
    If unsuccessful, it displays a flash message.
    Returns the login template for GET requests.

    Returns:
        str: The rendered template for login.
    """
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        remember = request.form.get('remember', False)  # Default to False if not set
        
        user = User.query.filter_by(email=email).first()
        if user and bcrypt.check_password_hash(user.password, password):
            login_user(user, remember=remember)
            return redirect(url_for('dashboard'))
        flash('Login unsuccessful. Please check email and password.', 'danger')
    return render_template('login.html')

# Logout function
@app.route('/logout')
@login_required
def logout():
    '''
    Logout the current user by calling the Flask-Login function `logout_user()` and redirect to the login page.
    '''
    logout_user()
    return redirect(url_for('login'))

# Dashboard for authenticated users
@app.route('/dashboard', methods=['GET', 'POST'])
@login_required
def dashboard():
    """
    Route for the dashboard page where users can add new todos and view existing ones.
    Handles POST requests to add a new todo with title, content, due date, and optional image.
    If POST request, adds the todo to the database, flashes a success message, and triggers a notification.
    Retrieves all todos belonging to the current user and renders the dashboard template with the todos.
    """
    send_notification_js = None

    if request.method == 'POST':
        # Add a new todo
        title = request.form.get('title')
        content = request.form.get('content')
        due_date_str = request.form.get('due_date')
        due_date = datetime.strptime(due_date_str, '%Y-%m-%d').date() if due_date_str else None

        image_file = request.files.get('image')  # Get the uploaded image
        webcam_image = request.form.get('webcam_image')  # Get the webcam image data

        image_path_to_save = handle_image_upload(image_file, webcam_image)

        todo = Todo(title=title, content=content, due_date=due_date, owner=current_user, image_path=image_path_to_save)
        db.session.add(todo)
        db.session.commit()
        flash('To-Do has been added!', 'success')
        send_notification_js = 'sendNotification();'  # Ensure this line is here

    todos = Todo.query.filter_by(owner=current_user).all()
    return render_template('dashboard.html', todos=todos, send_notification_js=send_notification_js)

def handle_image_upload(image_file, webcam_image):
    """Handle the uploading and saving of an image from either a file upload or webcam.

    Args:
        image_file: The uploaded image file.
        webcam_image: The webcam image data in base64 format.

    Returns:
        str: The path to the saved image in the media directory or None if no image provided.
    """
    if image_file:
        return save_uploaded_image(image_file)
    elif webcam_image:
        return save_webcam_image(webcam_image)
    return None  # No image provided

def save_uploaded_image(image_file):
    """Save an uploaded image to the media directory.

    Parameters:
    image_file: FileStorage object - The uploaded image file.

    Returns:
    str: The path where the image is saved in the media directory.
    """
    image_filename = f"{uuid.uuid4()}.jpg"
    image_path = os.path.join('static/media/', image_filename)
    image_file.save(image_path)
    return f'media/{image_filename}'  # Save path to database

def save_webcam_image(webcam_image):
    """Save a webcam image from base64 data.

    Args:
        webcam_image (str): Base64 encoded image data from the webcam.

    Returns:
        str: Path to the saved image in the media directory.
    """
    image_filename = f"{uuid.uuid4()}.jpg"
    image_path = os.path.join('static/media/', image_filename)
    image_data = webcam_image.split(',')[1]
    with open(image_path, 'wb') as f:
        f.write(base64.b64decode(image_data))  # Decode and save the image
    return f'media/{image_filename}'  # Save path to database

@app.route('/delete_todo/<int:id>')
@login_required
def delete_todo(id):
    """
    Delete a specific to-do item.

    Parameters:
    - id (int): The unique identifier of the to-do item to be deleted.

    Returns:
    - Redirects to the dashboard page after deleting the to-do item.

    Raises:
    - 403 error if the current user is not the owner of the to-do item.
    """
    todo = Todo.query.get_or_404(id)
    if todo.owner != current_user:
        abort(403)
    db.session.delete(todo)
    db.session.commit()
    flash('To-Do deleted!', 'success')
    return redirect(url_for('dashboard'))

@app.route('/toggle_status/<int:id>')
@login_required
def toggle_status(id):
    """
    Toggle the completion status of a to-do item.

    Parameters:
    - id (int): The id of the to-do item to toggle status for.

    Returns:
    - Redirect: Redirects to the dashboard page after updating the to-do status.

    Raises:
    - 403 Error: If the current user is not the owner of the to-do item.
    """
    todo = Todo.query.get_or_404(id)
    if todo.owner != current_user:
        abort(403)
    todo.completed = not todo.completed  # Toggle the status
    db.session.commit()
    flash('To-Do status updated!', 'success')
    return redirect(url_for('dashboard'))

@app.route('/edit_todo/<int:id>', methods=['POST'])
@login_required
def edit_todo(id):
    """
    Edit a specific To-Do item based on the provided ID.
    Check if the current user is the owner of the To-Do item before editing.
    Update the title, content, and due date of the To-Do item.
    Commit the changes to the database and redirect to the dashboard.
    """
    todo = Todo.query.get_or_404(id)
    if todo.owner != current_user:
        abort(403)
    todo.title = request.form.get('title')
    todo.content = request.form.get('content')
    todo.due_date = datetime.strptime(request.form.get('due_date'), '%Y-%m-%d').date() if request.form.get('due_date') else None
    db.session.commit()
    flash('To-Do updated!', 'success')
    return redirect(url_for('dashboard'))

# Profile view for users to see and edit their profile
@app.route('/profile', methods=['GET', 'POST'])
@login_required
def profile():
    '''
    Route for user profile with password update functionality.
    Returns:
    - GET: Renders the profile.html template with the current user's information.
    - POST: Updates the user's password if the new and confirm passwords match. Displays appropriate flash messages for success or failure. Redirects to the profile page.
    '''
    if request.method == 'POST':
        new_password = request.form.get('new_password')
        confirm_password = request.form.get('confirm_password')
        
        if new_password and confirm_password:
            if new_password == confirm_password:
                hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
                current_user.password = hashed_password
                try:
                    db.session.commit()
                    flash('Your password has been updated!', 'success')
                except:
                    db.session.rollback()
                    flash('Error updating password. Please try again.', 'danger')
            else:
                flash('Passwords do not match. Please try again.', 'danger')
        else:
            flash('Please fill in both password fields.', 'danger')
        
        return redirect(url_for('profile'))
    return render_template('profile.html', user=current_user)

@app.route('/settings', methods=['GET', 'POST'])
@login_required
def settings():
    '''
    Route for user settings page where users can update their preferences such as theme.
    If the request method is POST, updates the user's theme preference in the database and redirects to the settings page.
    If the request method is GET, renders the settings page with the current user's information.
    Requires user to be logged in.
    '''
    if request.method == 'POST':
        # Handle settings updates
        theme = request.form.get('theme')
        current_user.theme = theme  # Save the theme preference
        db.session.commit()
        flash('Your settings have been updated!', 'success')
        return redirect(url_for('settings'))
    return render_template('settings.html', user=current_user)

# Database creation
def create_tables():
    db.create_all()

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Ensure tables are created before starting the app
    app.run(debug=True)  # Enable debug mode for development
