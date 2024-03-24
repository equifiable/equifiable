from routers import auth
from typing import List
from firebase_admin.db import Reference
from database.database import get_database
from database.management_factory import database_management
from fastapi import APIRouter, status, Depends, HTTPException
from schemas.shares import Share, ShareResponse, ShareDelete, ShareSet

from utils.constants import *

router = APIRouter()
management = database_management['shares']



@router.get('/shares/{share_id}', response_model=ShareResponse, status_code=status.HTTP_200_OK)
async def get_share(share_id: str, db: Reference = Depends(get_database)) -> ShareResponse:
    """

    Retrieve a specific share from the database by its ID.

    Parameters:
        share_id (str): The ID of the share to retrieve.
        db (Reference): A reference to the Firebase database, injected by FastAPI's dependency injection.

    Returns:
        share (ShareResponse): The share data, retrieved from the database and modeled as a ShareResponse object.

    """
    # Get the data from the manager
    share = management.get_by_id(id=share_id,
                                       db=db)

    # Convert the dictionary to a ShareResponse object
    share = ShareResponse(**share)

    return share


@router.get('/shares', response_model=List[ShareResponse], status_code=status.HTTP_200_OK)
async def get_shares(db: Reference = Depends(get_database)):
    """

    Retrieve all shares from the database.

    Parameters:
        db (Reference): A reference to the Firebase database, injected by FastAPI's dependency injection.

    Returns:
        shares (List[ShareResponse]): A list of share data, retrieved from the database.

    """
    # Get the data from the manager
    shares = management.get_all(db=db)

    # Convert each dictionary in shares_data to a ShareResponse object
    # We're using a generator expression here instead of a list comprehension for better performance
    # A generator expression doesn't construct the whole list in memory, it generates each item on-the-fly
    shares = list(ShareResponse(**share) for share in shares)

    return shares


@router.delete('/shares/{share_id}', response_model=ShareResponse, status_code=status.HTTP_200_OK)
async def delete_share(share_id: str, db: Reference = Depends(get_database),
                             current_admin_id: str = Depends(auth.get_current_admin)) -> ShareResponse:
    """

    Deletes the share from database given it's ID

    Parameters:
        share_id (str): The ID of the share to retrieve.
        db (Reference): A reference to the Firebase database, injected by FastAPI's dependency injection.
        current_admin_id (str): The ID of the admin to authenticate.

    Returns:
        share (ShareResponse): The share data, deleted from the database and modeled as a ShareResponse object.

    """
    # Delete the data from the manager and return it
    share = management.delete(id=share_id,
                                    db=db)

    # Convert the dictionary to a ShareResponse object
    share = ShareResponse(**share)

    return share


@router.put('/shares/{share_id}', status_code=status.HTTP_200_OK, response_model=ShareResponse)
async def put_share(share_id: str, share: ShareSet, db: Reference = Depends(get_database),
                          current_admin_id: str = Depends(auth.get_current_admin)) -> ShareResponse:
    """
    Updates a share in the database.

    Parameters:
        share_id (str): The ID of the share to retrieve.
        share (ShareUpdate): The share data to be updated, parsed from the request body.
        db (Reference): A reference to the Firebase database, injected by FastAPI's dependency injection.
        current_admin_id (str): The ID of the admin to authenticate.

    Returns:
        share (ShareResponse): The updated share data, retrieved from the database.
    """
    # Convert the GenreUpdate Pydantic model to a dict
    share = share.dict()

    # Delete the data from the manager and return it
    updated_share = management.update(id=share_id,
                                            obj_data=share,
                                            db=db)

    # Convert the dict to a ShareResponse Pydantic model and return it
    return ShareResponse(**updated_share)
