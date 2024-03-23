import os
from dotenv import load_dotenv
from schemas.tokens import Token
from utils.hashing import Hashing
from firebase_admin.db import Reference
from utils.oauth2 import TokenManagement
from database.database import get_database
from database.management_factory import database_management
from fastapi.security import OAuth2PasswordBearer
from fastapi import APIRouter, status, Depends, HTTPException
from fastapi.security.oauth2 import OAuth2PasswordRequestForm

# Loading databases
users = database_management['users']
admins = database_management['admins']

# Creating an instance of the FastAPI router.
router = APIRouter()

# Creating an instance of the Hashing class.
hashing = Hashing()

# Loading environment variables from the .env file.
load_dotenv()

# Defining URL for user login. Then, creating an instance of
# the TokenManagement class with secret key of users. After,
# Defining the schema for OAuth2 password bearer with login users URL.

login_users_url = '/login/users'
user_authenticator = TokenManagement(os.getenv('SECRET_KEY_USERS'))
oauth2_user_schema = OAuth2PasswordBearer(tokenUrl=login_users_url)

# Defining URL for admin login. Then, creating an instance of
# the TokenManagement class with secret key of admin. After,
# Defining the schema for OAuth2 password bearer with login admins URL.

login_admins_url = '/login/admins'
admin_authenticator = TokenManagement(os.getenv('SECRET_KEY_ADMINS'))
oauth2_admin_schema = OAuth2PasswordBearer(tokenUrl=login_admins_url)

def get_current_user(token: str = Depends(oauth2_user_schema)):
    """

    Function to get the current user based on the provided OAuth2 token.

    Args:
        token (str, optional): OAuth2 token. Default is the dependency of OAuth2PasswordBearer instance.

    Returns:
        The data of the current user.

    """
    return user_authenticator.get_token_data(token, 'user')


def get_current_admin(token: str = Depends(oauth2_admin_schema)):
    """

    Function to get the current admin based on the provided OAuth2 token.

    Args:
        token (str, optional): OAuth2 token. Default is the dependency of OAuth2PasswordBearer instance.

    Returns:
        The data of the current admin.

    """
    return admin_authenticator.get_token_data(token, 'admin')


@router.post(login_users_url, status_code=status.HTTP_200_OK, response_model=Token)
async def authenticate_user(credentials: OAuth2PasswordRequestForm = Depends(), db: Reference = Depends(get_database)):
    """

    Function to authenticate the user based on the provided credentials.

    Args:
        credentials (OAuth2PasswordRequestForm, optional): The provided user credentials. Default is the dependency of OAuth2PasswordRequestForm instance.
        db (Reference, optional): Reference to the database. Default is the dependency of the get_database function.

    Raises:
        HTTPException: If the user's credentials are not found in the database or the provided password does not match the stored hashed password.

    Returns:
        Token: The token of the authenticated user.
    """
    # get_by_field returns a list, so get the first item if it exists or None otherwise.
    user_data_in_db = next(iter(users.get_by_field(field='email',
                                                              value=credentials.username,
                                                              db=db)), None)

    # Raise an exception if the user's credentials are not found in the database.
    if not user_data_in_db:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Credentials")

    provided_password = credentials.password
    stored_hashed_password = user_data_in_db['password']

    # Check if the provided password matches the hashed password in the database.
    if not hashing.verify_password(provided_password, stored_hashed_password):
        # Raise an exception if the provided password does not match the stored hashed password.
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Credentials")

    # Getting user_id.
    user_id = user_data_in_db['user_id']

    # Creating Access JWT Token for the user.
    token = user_authenticator.create_access_token(data={'id': user_id},
                                                   kind='user')
    token = Token(**token)

    # If no exceptions were raised, the user's credentials are valid and the user is authenticated.
    return token


@router.post(login_admins_url, status_code=status.HTTP_200_OK, response_model=Token)
async def authenticate_admin(credentials: OAuth2PasswordRequestForm = Depends(), db: Reference = Depends(get_database)):
    """

    Function to authenticate the admin based on the provided credentials.

    Args:
        credentials (OAuth2PasswordRequestForm, optional): The provided admin credentials. Default is the dependency of OAuth2PasswordRequestForm instance.
        db (Reference, optional): Reference to the database. Default is the dependency of the get_database function.

    Raises:
        HTTPException: If the admin's credentials are not found in the database or the provided password does not match the stored hashed password.

    Returns:
        Token: The token of the authenticated admin.

    """

    # get_by_field returns a list, so get the first item if it exists or None otherwise.
    admin_data_in_db = next(iter(admins.get_by_field(field='name',
                                                                value=credentials.username,
                                                                db=db)), None)

    # Raise an exception if the admin's credentials are not found in the database.
    if not admin_data_in_db:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Credentials")

    provided_password = credentials.password
    stored_hashed_password = admin_data_in_db['password']

    # Check if the provided password matches the hashed password in the database.
    if not hashing.verify_password(provided_password, stored_hashed_password):
        # Raise an exception if the provided password does not match the stored hashed password.
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid Credentials")

    # Getting admin_id
    admin_id = admin_data_in_db['admin_id']

    # Creating Access JWT Token for the admin.
    token = admin_authenticator.create_access_token(data={'id': admin_id},
                                                    kind='admin')
    token = Token(**token)

    # If no exceptions were raised, the admin's credentials are valid and the admin is authenticated.
    return token

