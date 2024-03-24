from routers import auth
from typing import List
from firebase_admin.db import Reference
from database.database import get_database
from database.management_factory import database_management
from fastapi import APIRouter, status, Depends, HTTPException

from utils.constants import *
from updater.update_firebase import update_database

router = APIRouter()
management = database_management['recipients']



@router.get('/update', response_model=None, status_code=status.HTTP_200_OK)
async def update(db: Reference = Depends(get_database)) -> None:
    """

    Retrieve a specific recipient from the database by its ID.

    Parameters:
        recipient_id (str): The ID of the recipient to retrieve.
        db (Reference): A reference to the Firebase database, injected by FastAPI's dependency injection.

    Returns:
        recipient (RecipientResponse): The recipient data, retrieved from the database and modeled as a RecipientResponse object.

    """
    # Update database
    update_database(db)

