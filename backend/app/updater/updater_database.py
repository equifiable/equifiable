import os
import json
import base64
import firebase_admin
from firebase_admin import db


def connect_to_database():

    """
    Function to connect to a Firebase real-time database.

    It reads the path to Firebase credential and the database URL from environment variables.
    Then it initializes the Firebase application with these credentials and URL.

    """
    # Convert the string back to a JSON object
    credentials = '../credentials/credentials.json'
    # Get the Firebase database URL from environment variables
    database_url = os.getenv('DATABASE_URL')
    # Initialize a credential object using the Firebase certificate at the path we obtained earlier
    cred_object = firebase_admin.credentials.Certificate(credentials)
    # Initialize the Firebase app with the credential object and the database URL
    default_app = firebase_admin.initialize_app(cred_object, {
        'databaseURL': database_url
    })


def get_database():

    """
    Returns a reference to the root of the database.

    Returns:
        Reference: A reference to the root of the database.

    """
    # Return a reference to the root of the database
    return db.reference('/')

