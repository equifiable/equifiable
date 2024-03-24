from routers import auth
from typing import List
from firebase_admin.db import Reference
from database.database import get_database
from database.management_factory import database_management
from fastapi import APIRouter, status, Depends, HTTPException
from schemas.recipients import Recipient, RecipientResponse, RecipientDelete, RecipientSet

from utils.constants import *

router = APIRouter()
management = database_management['recipients']



@router.get('/recipients/{recipient_id}', response_model=RecipientResponse, status_code=status.HTTP_200_OK)
async def get_recipient(recipient_id: str, db: Reference = Depends(get_database)) -> RecipientResponse:
    """

    Retrieve a specific recipient from the database by its ID.

    Parameters:
        recipient_id (str): The ID of the recipient to retrieve.
        db (Reference): A reference to the Firebase database, injected by FastAPI's dependency injection.

    Returns:
        recipient (RecipientResponse): The recipient data, retrieved from the database and modeled as a RecipientResponse object.

    """
    # Get the data from the manager
    recipient = management.get_by_id(id=recipient_id,
                                       db=db)

    # Convert the dictionary to a RecipientResponse object
    recipient = RecipientResponse(**recipient)

    return recipient


@router.get('/recipients', response_model=List[RecipientResponse], status_code=status.HTTP_200_OK)
async def get_recipients(db: Reference = Depends(get_database)):
    """

    Retrieve all recipients from the database.

    Parameters:
        db (Reference): A reference to the Firebase database, injected by FastAPI's dependency injection.

    Returns:
        recipients (List[RecipientResponse]): A list of recipient data, retrieved from the database.

    """
    # Get the data from the manager
    recipients = management.get_all(db=db)

    # Convert each dictionary in recipients_data to a RecipientResponse object
    # We're using a generator expression here instead of a list comprehension for better performance
    # A generator expression doesn't construct the whole list in memory, it generates each item on-the-fly
    recipients = list(RecipientResponse(**recipient) for recipient in recipients)

    return recipients


@router.delete('/recipients/{recipient_id}', response_model=RecipientResponse, status_code=status.HTTP_200_OK)
async def delete_recipient(recipient_id: str, db: Reference = Depends(get_database),
                             current_admin_id: str = Depends(auth.get_current_admin)) -> RecipientResponse:
    """

    Deletes the recipient from database given it's ID

    Parameters:
        recipient_id (str): The ID of the recipient to retrieve.
        db (Reference): A reference to the Firebase database, injected by FastAPI's dependency injection.
        current_admin_id (str): The ID of the admin to authenticate.

    Returns:
        recipient (RecipientResponse): The recipient data, deleted from the database and modeled as a RecipientResponse object.

    """
    # Delete the data from the manager and return it
    recipient = management.delete(id=recipient_id,
                                    db=db)

    # Convert the dictionary to a RecipientResponse object
    recipient = RecipientResponse(**recipient)

    return recipient


@router.put('/recipients/{recipient_id}', status_code=status.HTTP_200_OK, response_model=RecipientResponse)
async def put_recipient(recipient_id: str, recipient: RecipientSet, db: Reference = Depends(get_database),
                          current_admin_id: str = Depends(auth.get_current_admin)) -> RecipientResponse:
    """
    Updates a recipient in the database.

    Parameters:
        recipient_id (str): The ID of the recipient to retrieve.
        recipient (RecipientUpdate): The recipient data to be updated, parsed from the request body.
        db (Reference): A reference to the Firebase database, injected by FastAPI's dependency injection.
        current_admin_id (str): The ID of the admin to authenticate.

    Returns:
        recipient (RecipientResponse): The updated recipient data, retrieved from the database.
    """
    # Convert the GenreUpdate Pydantic model to a dict
    recipient = recipient.dict()

    # Delete the data from the manager and return it
    updated_recipient = management.update(id=recipient_id,
                                            obj_data=recipient,
                                            db=db)

    # Convert the dict to a RecipientResponse Pydantic model and return it
    return RecipientResponse(**updated_recipient)
