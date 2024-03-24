from typing import List, Any
from datetime import datetime
from firebase_admin.db import Reference
from firebase_admin.exceptions import InvalidArgumentError
from firebase_admin.exceptions import FirebaseError
from fastapi import status, HTTPException


# noinspection PyTypeChecker,PyUnresolvedReferences
class DatabaseManagement:
    def __init__(self, table_name: str, class_name_id: str):
        self.table_name = table_name
        self.class_name_id = class_name_id

    def get_by_field(self, field: str, value: Any, db: Reference) -> List[dict]:

        """

        Retrieves all records from a specified table in the Firebase Realtime Database where a specified field matches a specified value.

        This function accepts `field` and `value` parameters to filter the data. It fetches all data from the table specified by
        `self.table_name` and checks each record. If the specified field in a record matches the specified value, the record is added to the
        results list.

        If a FirebaseError is encountered during the process, an HTTPException with a status code of 500 (Internal Server Error) is raised.

        Args:
            field (str): The field used to filter the records.
            value (str): The value used to filter the records.
            db (db.Reference): The Firebase database reference used for data retrieval.

        Returns:
            List[dict]: A list of dictionaries representing the records matching the field-value criteria.

        Raises:
            HTTPException:
                - If any error occurs during the interaction with Firebase, an HTTPException is raised with a status
                code of 500 (Internal Server Error), along with a detailed error message.

        """
        try:
            # Get all objects from Firebase that have the specified field equal to the specified value
            objects = db.child(self.table_name).order_by_child(field).equal_to(value).get()


        except InvalidArgumentError:
            # If an InvalidArgumentError occurred, raise a 500 status code with a user-friendly message
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail=f"Firebase requires an index on '{field}'. "
                                       f"Please add '.indexOn': '{field}' under '{self.table_name}' in your Firebase Database Rules.")


        except Exception as error:
            # If an error occurred while interacting with Firebase, raise a 500 status code with a helpful message
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail=f"An error occurred while trying to fetch data: {error}")

        objects_data = []
        for key, obj in objects.items():
            # Create a dictionary for the object data and add the id
            obj_data = {self.class_name_id: key, **obj}
            objects_data.append(obj_data)

        return objects_data

    def verify_id(self, id:str, db: Reference) -> bool:

        """

        Verifies if a specific ID exists in the Firebase Realtime Database.

        This method establishes a reference to a specific location within the Firebase
        Realtime Database by using the provided `id` parameter. It then attempts to retrieve
        the data at that location. The method returns True if data is found (indicating that
        the ID does exist), and False otherwise.

        Args:
            id (str): The unique identifier that is being checked for existence within the database.
            db (Reference): A reference to the database that will be used for the ID verification.

        Returns:
            bool: True if the ID exists in the database, False otherwise.

        """

        try:
            # Construct a reference to the specific object in Firebase
            reference = db.child(self.table_name).child(id)

            # Use the reference to get the object data
            obj = reference.get()

        except FirebaseError as error:
            # If an error occurred while interacting with Firebase, raise a 500 status code with a helpful message
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail=f"An error occurred while trying to fetch data: {error}")

        return obj is not None

    def get_by_id(self, id: str, db: Reference) -> dict:

        """

        Retrieves a specific record from a specified table in the Firebase Realtime Database by its ID.

        This function constructs a reference to a specific record in the Firebase Realtime Database
        using the provided `db` reference and the `id` parameter. It then attempts to fetch the data
        corresponding to the ID from the table specified by `self.table_name`.

        If the function successfully fetches the data, it adds the ID to the returned dictionary under
        the key `self.class_name_id` and returns the dictionary. If no data corresponding to the ID is
        found, the function raises an HTTPException with a 404 status code.

        In case of a FirebaseError, the function raises an HTTPException with a 500 status code, indicating
        a server error.

        Args:
            id (str): The unique identifier of the record that is being fetched from the database.
            db (Reference): The Firebase database reference used for data retrieval.

        Returns:
            dict: A dictionary representing the record fetched from the table, including the record's
            Firebase-generated unique ID as a key.

        Raises:
            HTTPException:
                - If any error occurs during the interaction with Firebase, an HTTPException is raised with a status
                code of 500 (Internal Server Error), and a detailed error message.
                - If no data corresponding to the ID is found in the database, an HTTPException is raised with a status
                code of 404 (Not Found), along with an appropriate error message.

        """

        try:
            # Construct a reference to the specific genre in Firebase
            reference = db.child(self.table_name).child(id)

            # Use the reference to get the genre data
            response = reference.get()
        except FirebaseError as error:
            # If an error occurred while interacting with Firebase, raise a 500 status code with a helpful message
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail=f"An error occurred while trying to fetch data: {error}")

        # If the response data is None, that means the response was not found
        if response is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                detail=f"{self.class_name_id} == {id} was not found.")

        # If the response data is not None, we add the id to the dictionary
        else:
            response[self.class_name_id] = id

        return response

    def get_all(self, db: Reference) -> List[dict]:

        """

        Retrieves all records from a specified table in the Firebase Realtime Database.

        This function creates a reference to the table specified by `self.table_name` in the
        Firebase Realtime Database using the provided `db` reference. It attempts to retrieve
        all data from that table. If successful, the function returns a list of dictionaries
        containing the retrieved data, with each dictionary representing one record from the
        table. The Firebase-generated unique ID of each record is included in its respective
        dictionary with the key being `self.class_name_id`.

        In case of a FirebaseError, the function raises an HTTPException with a 500 status code,
        indicating a server error.

        Args:
            db (Reference): The Firebase database reference to use for data retrieval.

        Returns:
            List[dict]: A list of dictionaries, where each dictionary represents a record from
            the table. Each dictionary includes the record's Firebase-generated unique ID as a key.

        Raises:
            HTTPException: If any error occurs during the interaction with Firebase, an HTTPException
            is raised with a status code of 500 (Internal Server Error), and a detailed error message.

        """

        try:
            # Get all objects from Firebase
            objects = db.child(self.table_name).get()
        except FirebaseError as error:
            # If an error occurred while interacting with Firebase, raise a 500 status code with a helpful message
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail=f"An error occurred while trying to fetch data: {error}")

            # Create a list of dictionaries, adding the key as 'id' to each dictionary
            # Here, key is the unique id generated by Firebase, and value is the corresponding object data

        # Verify if return list is empty
        if not objects:
            return []

        objects_data = [{self.class_name_id: key, **value} for key, value in objects.items() if value]

        return objects_data

    def post(self, obj_data: dict, db: Reference) -> dict:

        """
        Creates a new record in a specified table in the Firebase Realtime Database.

        This function accepts a dictionary representing the data to be stored (`obj_data`), and
        a reference to the Firebase Realtime Database (`db`). It adds a 'created_at' field to
        the `obj_data` dictionary, setting it to the current UTC time.

        The function then creates a new record in the table specified by `self.table_name`,
        using a unique key. It sets the object data at the new reference and then retrieves the
        created object data (to include any server-side transformations or additions).

        The Firebase-generated unique key of the record is then added to the dictionary under
        the key `self.class_name_id` before the function returns the dictionary.

        If a FirebaseError is encountered during the process, an HTTPException with a status
        code of 500 (Internal Server Error) is raised.

        Args:
            obj_data (dict): The dictionary containing the data to be stored in the new record.
            db (Reference): The Firebase database reference used for data creation.

        Returns:
            dict: A dictionary representing the record created in the table, including the record's
            Firebase-generated unique key as a key and the server timestamp of creation.

        Raises:
            HTTPException:
                - If any error occurs during the interaction with Firebase, an HTTPException is raised with a status
                code of 500 (Internal Server Error), along with a detailed error message.
        """

        # Create the 'created_at' field with reference in UTC time
        obj_data['created_at'] = datetime.utcnow().isoformat()

        try:
            # Create a new reference in the table, with a unique key
            reference = db.child(self.table_name).push()

            # Set the object data at the new reference
            reference.set(obj_data)

            # Retrieve the created object data using the new reference
            # We do this to include any server-side transformations or additions (like the created time) in the response
            obj_data = reference.get()

            # Adding the primary key
            obj_data[self.class_name_id] = reference.key

            # Return the created object data, along with a 201 status code
            return obj_data

        except FirebaseError as error:
            # If an error occurred while interacting with Firebase, return a 500 status code with a helpful message
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail=f"An error occurred while trying to push data: {error}")

    def delete(self, id: str, db: Reference) -> dict:

        """

        Deletes a specific record from a specified table in the Firebase Realtime Database by its ID.

        This function constructs a reference to a specific record in the Firebase Realtime Database
        using the provided `db` reference and the `id` parameter. It then attempts to fetch the data
        corresponding to the ID from the table specified by `self.table_name`.

        If the function successfully fetches the data, it proceeds to delete the record from the database.
        The function then adds the ID to the fetched data under the key `self.class_name_id` and returns
        the fetched data. If no data corresponding to the ID is found, the function raises an HTTPException
        with a 404 status code.

        In case of a FirebaseError, the function raises an HTTPException with a 500 status code, indicating
        a server error.

        Args:
            id (str): The unique identifier of the record that is being fetched and deleted from the database.
            db (Reference): The Firebase database reference used for data retrieval and deletion.

        Returns:
            dict: A dictionary representing the deleted record from the table, including the record's
            Firebase-generated unique ID as a key.

        Raises:
            HTTPException:
                - If any error occurs during the interaction with Firebase, an HTTPException is raised with a status
                code of 500 (Internal Server Error), and a detailed error message.
                - If no data corresponding to the ID is found in the database, an HTTPException is raised with a status
                code of 404 (Not Found), along with an appropriate error message.
        """

        try:
            # Construct a reference to the specific object in Firebase
            reference = db.child(self.table_name).child(id)

            # Use the reference to get the object data
            obj_data = reference.get()

            if obj_data is not None:
                # Deleting the desired data
                reference.delete()
                # If the object data is not None, we add the id to the dictionary
                obj_data[self.class_name_id] = id
            else:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                    detail=f"{self.class_name_id} == {id} was not found.")

            return obj_data

        except FirebaseError as error:
            # If an error occurred while interacting with Firebase, raise a 500 status code with a helpful message
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail=f"An error occurred while trying to fetch data: {error}")

    def update(self, id: str, obj_data: dict, db: Reference) -> dict:

        """

        Updates a specific record in a specified table in the Firebase Realtime Database by its ID.

        This function constructs a reference to a specific record in the Firebase Realtime Database
        using the provided `db` reference and the `id` parameter. It then fetches the current data
        corresponding to the ID from the table specified by `self.table_name`.

        If the function successfully fetches the data, it replaces the old data with the `obj_data`
        parameter while preserving the original 'created_at' timestamp. After updating, the function
        retrieves the updated record data, includes the ID in the returned data under the key
        `self.class_name_id`, and then returns the updated data. If no data corresponding to the ID
        is found, the function raises an HTTPException with a 404 status code.

        In case of a FirebaseError during the process, an HTTPException with a status code of 500
        (Internal Server Error) is raised.

        Args:
            id (str): The unique identifier of the record that is being updated in the database.
            obj_data (dict): The dictionary containing the new data to update the record with.
            db (Reference): The Firebase database reference used for data retrieval and updating.

        Returns:
            dict: A dictionary representing the updated record from the table, including the record's
            Firebase-generated unique ID as a key.

        Raises:
            HTTPException:
                - If any error occurs during the interaction with Firebase, an HTTPException is raised with a status
                code of 500 (Internal Server Error), along with a detailed error message.
                - If no data corresponding to the ID is found in the database, an HTTPException is raised with a status
                code of 404 (Not Found), along with an appropriate error message.

        """

        try:
            # Create a reference to the object in the table in Firebase
            reference = db.child(self.table_name).child(id)

            # Get the current object data
            old_obj_data = reference.get()

            # If the object doesn't exist, raise a 404 Not Found exception
            if old_obj_data is None:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                                    detail=f"{self.class_name_id} == {id} was not found.")

            # If the object exists, keep the created_at timestamp unchanged
            obj_data['created_at'] = old_obj_data['created_at']

            # Update the object data at the reference
            reference.update(obj_data)

            # Retrieve the updated object data from Firebase
            # This includes any server-side transformations or additions
            updated_obj_data = reference.get()

            # Add the id to the object data
            updated_obj_data[self.class_name_id] = id

            return updated_obj_data

        except FirebaseError as error:
            # If an error occurred while interacting with Firebase, raise a 500 Internal Server Error
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                                detail=f"An error occurred while trying to update the object: {error}")
