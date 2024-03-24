from passlib.context import CryptContext


class Hashing:

    """

    A class used for hashing-related functionality.

    ...

    Attributes:
    context : CryptContext
        an object of CryptContext from the passlib module for password hashing.

    Methods:
    hash_password(password: str) -> str:
        Hashes a plaintext password and returns the hashed password.

    verify_password(possible_password: str, db_hashed_password: str) -> bool:
        Verifies a potential plaintext password with a hashed password in the database.

    """

    def __init__(self):
        """
        Constructs all the necessary attributes for the Hashing object.
        """

        # Initialize CryptContext with bcrypt hashing scheme
        self.context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    def hash_password(self, password):
        """
        Hashes a plaintext password and returns the hashed password.

        Parameters:
        password (str): The plaintext password.

        Returns:
        str: The hashed password.
        """

        # Hashes the plaintext password and returns the hashed password
        return self.context.hash(password)

    def verify_password(self, possible_password, db_hashed_password):
        """
        Verifies a potential plaintext password with a hashed password.

        Parameters:
        possible_password (str): The plaintext password to verify.
        db_hashed_password (str): The hashed password against which to verify.

        Returns:
        bool: True if the potential password is verified, False otherwise.
        """

        # Verifies if the hashed potential password matches the stored hashed password
        return self.context.verify(possible_password, db_hashed_password)
