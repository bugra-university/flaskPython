<p align="center" width="100%">
    <img width="33%" src="static\images\university-logo.png" alt="University Logo" width="250"> 
</p>

<p align="center">
    <strong>Buğra Han - 42078</strong>
</p>




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

<details>
  <summary>📌 Home Page</summary>
  <p>
    <img src="static\images\Screenshot1.png" alt="Project Backlog">
  </p>
</details>

<details>
  <summary>📝 Task Management</summary>
  <p>
    <img src="static\images\screenshot2.png" alt="Architectural Diagram">
  </p>
</details>

<details>
  <summary>🔒 User Authentication</summary>
  <p>
    <img src="static\images\screenshot3.png" alt="Use Case Diagram">
  </p>
</details>


## Contributing

Contributions are welcome! If you find any issues or have feature requests, feel free to create an issue or submit a pull request.


## Repository

You can view and clone the project from the GitHub repository:

📂 **Repository Link:** [Flask PWA - ToDo Application](https://github.com/hanbugra82/flaskPython)


## Heroku Deployment

If you want to deploy your project to a cloud environment rather than your local computer, you can use **Heroku**. Heroku is a platform that allows you to quickly deploy and manage your applications in the cloud. You can follow these steps to deploy your application on Heroku:

1. **Create a New Application on Heroku**:
   ```bash
   heroku create your-app-name
2. **Push Your Application to Heroku**:
   ```bash
   git push heroku master
3. **Check if Your Application Is Successfully Deployed**:
   ```bash
   https://your-app-name.herokuapp.com


## Database Setup on Heroku

To create and set up your database on **Heroku**, follow the steps below:

1. **Run the Database Creation Script**:
   ```bash
   heroku run python create_db.py --app your-app-name
   This command will create the necessary database tables.
2. **Test Your Database**:
   To ensure that the database is working correctly, you can log into your application and add or manage tasks in the To-Do list.


## Custom Domain Setup

If you've purchased a custom domain through hosting.com.tr, like www.hanbugra.com.tr, you can point this domain to your Heroku app. Here’s how:

1. Go to the any hosting web sites control panel.
2. Add your custom domain under the DNS settings.
3. Point the domain to the DNS target provided by Heroku. For example:
   ```bash
   peaceful-everglades-73t012l2hq1m0qg2em...

Now, your custom domain should be linked to your Heroku app, and you can access it through "www.hanbugra.com.tr"


## License

This project is licensed under the [MIT License](LICENSE).

