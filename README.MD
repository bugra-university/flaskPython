# Flask To-Do List Application

A simple and intuitive To-Do list application built with Flask, utilizing SQLAlchemy for ORM, Flask-Login for user authentication, and Flask-Bcrypt for password hashing.

## Features

- User Registration and Authentication
- Create, Edit, Delete To-Dos
- Upload images for To-Dos
- User Profile Management
- User Preferences (Theme Settings)
- Dashboard to view all To-Dos
- Responsive and user-friendly interface

## Prerequisites

- Python 3.11.7
- Flask
- Flask-SQLAlchemy
- Flask-Bcrypt
- Flask-Login
- Flask-CORS

## Project Structure

```bash
flask-web-project/
│
├── app.py                   # Main application file
├── README.md                # Project documentation and instructions
├── requirements.txt         # List of project dependencies
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
│   └── service-worker.js     # Service worker for Progressive Web Apps (PWA)
│
├── templates/               # HTML templates directory
│
└── __pycache__/             # Cache directory for compiled Python files
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/hanbugra82/flaskPython.git
   cd flask-todo-app
    ```
2. Create a virtual environment:
    ```bash
    python -m venv venv
    ```
3. Activate the virtual environment:
    ```bash
    venv\Scripts\activate
    ```
4. Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```
5. Run the application:
    ```bash
    python app.py
    ```
6. Open your browser and visit http://
    ```bash
    http://localhost:5000
    ```
7. Register a new account and start creating To-Dos!
