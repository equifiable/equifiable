from jose import JWTError, jwt
from datetime import datetime, timedelta
from fastapi import HTTPException, status
from utils.constants import ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES


class TokenManagement:
    """
    Class for managing JWT tokens including creating, verifying, and getting token data.
    """

    def __init__(self, secret_key: str):
        """
        Initializing TokenManagement with a secret key.

        Args:
            secret_key (str): Secret key for JWT token.
        """
        self.secret_key = secret_key

    def create_access_token(self, data: dict, kind: str) -> dict:
        """
        Function to create an access token.

        Args:
            data (dict): Data to be encoded into the token.
            kind (str): The kind of the token.

        Returns:
            dict: The access token as a dictionary.
        """
        # Copying the data to a new dictionary.
        data_to_encode = data.copy()

        # Setting the expire time for the token.
        expire_time = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        data_to_encode.update({"exp": expire_time})
        data_to_encode.update({"kind": kind})

        # Encoding the data to create the JWT token.
        access_token = jwt.encode(claims=data_to_encode,
                                  key=self.secret_key,
                                  algorithm=ALGORITHM)

        # Creating the token dictionary.
        token = {"access_token": access_token, "token_type": "bearer"}

        return token

    def verify_access_token(self, token: str, kind: str, credentials_exception: HTTPException) -> dict:
        """
        Function to verify an access token.

        Args:
            token (str): The token to be verified.
            kind (str): The kind of the token.
            credentials_exception (HTTPException): Exception to be raised if the token is invalid.

        Returns:
            dict: The verified token data.

        Raises:
            HTTPException: If the token is invalid.
        """
        try:
            # Decoding the token.
            payload = jwt.decode(token, self.secret_key, algorithms=[ALGORITHM])

            id: str = payload.get('id')
            str(payload.get('kind'))

            # Checking if the id or kind is None.
            if id is None or kind is None:
                raise credentials_exception

            # Checking if the kind in the token matches the expected kind.
            if kind != str(payload.get('kind')):
                raise credentials_exception

            return id
        except JWTError:
            raise credentials_exception

    def get_token_data(self, token: str, kind: str):

        """

        Function to get the data from a token.

        Args:
            token (str): The token from which to get the data.
            kind (str): The kind of the token.

        Returns:
            dict: The token data.

        Raises:
            HTTPException: If the token is invalid.

        """
        # Creating an exception for invalid credentials.
        credentials_exception = HTTPException(status_code=status.HTTP_403_FORBIDDEN,
                                              detail=f'Could not validate credentials',
                                              headers={'WWW-Authenticate': 'Bearer'}
                                              )
        # Verifying the access token and returning the token data.
        return self.verify_access_token(token, kind, credentials_exception)
