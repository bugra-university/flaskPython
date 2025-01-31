# Flask PWA - ToDo Application

A simple and intuitive To-Do list application built with Flask, utilizing SQLAlchemy for ORM, Flask-Login for user authentication, and Flask-Bcrypt for password hashing.

## Features

- 🌐 **PWA compatible**: Installable as a Progressive Web App
- 📱 **Responsive design**: User-friendly interface optimized for all devices
- 🔄 **Offline functionality**: Works without an internet connection
- 🔐 **User authentication**: Secure registration, login, and password management
- 📊 **Dashboard interface**: View and manage all To-Do tasks easily
- ✅ **To-Do Management**: Create, edit, delete tasks, and upload images for tasks

### Account Management
- 🗑️ **Sign Up**: Create a new account
- 🔑 **Log In**: Access your existing account
- 🔒 **Password Reset**: Securely reset your password

### To-Do Operations
- ➕ **Create New Task**: Add new To-Do items
- ✏️ **Edit Task**: Modify existing tasks
- ❌ **Delete Task**: Remove completed or unnecessary tasks
- 📸 **Add Task Image**: Upload images related to your tasks

### Profile Management
- 🖊️ **Update Profile Information**: Edit your personal details
- 🖼️ **Change Profile Picture**: Upload a new profile image
- 🎗 **Theme Preferences**: Toggle between Light and Dark modes

## Prerequisites

To run this project, ensure you have the following installed:

- Python (3.11 or later)
- Flask (Python web framework)
- SQLAlchemy (ORM)
- Flask-Login (User authentication)
- Flask-Upload (File uploads)
- HTML5, CSS3, JavaScript
- Service Workers (For PWA functionality)
- Cache API (Offline support)

## Project Structure

```bash
flask-web-project/
├── app.py                   # Main application file
├── README.md                # Project documentation and instructions
├── requirements.txt         # List of project dependencies
├── LICENSE                  # License file for the project
├── manifest.json            # Web app manifest file
│
├── instance/                # Instance folder (for configuration, databases, etc.)
│
├── static/                  # Static files directory
│   ├── css/                 # CSS files
│   ├── icons/               # Icon files
│   ├── images/              # Image files
│   ├── js/                  # JavaScript files
│   ├── media/               # Media files (e.g., user-uploaded images)
│   └── service-worker.js    # Service worker for Progressive Web Apps (PWA)
│
├── templates/               # HTML templates directory
│   ├── index.html           # Main HTML template
│   ├── login.html           # Login page template
│   └── dashboard.html       # To-Do dashboard template
│
└── __pycache__/             # Cache directory for compiled Python files

```

## 🚀 Lighthouse Reports

Automated performance and best practices audits conducted using **Google Lighthouse**. You can view the reports from the links below:

- **📱 Mobile Report** – [View Mobile Report](reports/lighthouse-report-mobile.html)
- **🖥️ Desktop Report** – [View Desktop Report](reports/lighthouse-report-desktop.html)


## Installation

Follow these steps to set up and run the application:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd flask-web-project
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the application:
   ```bash
   flask run
   ```

4. Access the application in your web browser at:
   ```
   http://127.0.0.1:5000/
   ```

## Screenshots 📸

Here are some screenshots of the To-Do Application:

### 📌 Home Page
![Home Page](![Home Page](https://github.com/hanbugra82/flaskPython/blob/master/static/images/Screenshot1.png?raw=true)

### 📝 Task Management
![Task Management](https://github.com/hanbugra82/flaskPython/blob/master/static/images/screenshot2.png?raw=true)

### 🔒 User Authentication
![User Authentication](https://github.com/hanbugra82/flaskPython/blob/master/static/images/screenshot3.png?raw=true)

## Contributing

Contributions are welcome! If you find any issues or have feature requests, feel free to create an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

