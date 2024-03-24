from routers import auth
from typing import List
from firebase_admin.db import Reference
from database.database import get_database
from database.management_factory import database_management
from fastapi import APIRouter, status, Depends, HTTPException
from schemas.companies import Company, CompanyResponse, CompanyDelete, CompanySet

from utils.constants import *

router = APIRouter()
management = database_management['companies']



@router.get('/companies/{company_id}', response_model=CompanyResponse, status_code=status.HTTP_200_OK)
async def get_company(company_id: str, db: Reference = Depends(get_database)) -> CompanyResponse:
    """

    Retrieve a specific company from the database by its ID.

    Parameters:
        company_id (str): The ID of the company to retrieve.
        db (Reference): A reference to the Firebase database, injected by FastAPI's dependency injection.

    Returns:
        company (CompanyResponse): The company data, retrieved from the database and modeled as a CompanyResponse object.

    """
    # Get the data from the manager
    company = management.get_by_id(id=company_id,
                                       db=db)

    # Convert the dictionary to a CompanyResponse object
    company = CompanyResponse(**company)

    return company


@router.get('/companies', response_model=List[CompanyResponse], status_code=status.HTTP_200_OK)
async def get_companies(db: Reference = Depends(get_database)):
    """

    Retrieve all companies from the database.

    Parameters:
        db (Reference): A reference to the Firebase database, injected by FastAPI's dependency injection.

    Returns:
        companies (List[CompanyResponse]): A list of company data, retrieved from the database.

    """
    # Get the data from the manager
    companies = management.get_all(db=db)

    # Convert each dictionary in companies_data to a CompanyResponse object
    # We're using a generator expression here instead of a list comprehension for better performance
    # A generator expression doesn't construct the whole list in memory, it generates each item on-the-fly
    companies = list(CompanyResponse(**company) for company in companies)

    return companies


@router.delete('/companies/{company_id}', response_model=CompanyResponse, status_code=status.HTTP_200_OK)
async def delete_company(company_id: str, db: Reference = Depends(get_database),
                             current_admin_id: str = Depends(auth.get_current_admin)) -> CompanyResponse:
    """

    Deletes the company from database given it's ID

    Parameters:
        company_id (str): The ID of the company to retrieve.
        db (Reference): A reference to the Firebase database, injected by FastAPI's dependency injection.
        current_admin_id (str): The ID of the admin to authenticate.

    Returns:
        company (CompanyResponse): The company data, deleted from the database and modeled as a CompanyResponse object.

    """
    # Delete the data from the manager and return it
    company = management.delete(id=company_id,
                                    db=db)

    # Convert the dictionary to a CompanyResponse object
    company = CompanyResponse(**company)

    return company


@router.put('/companies/{company_id}', status_code=status.HTTP_200_OK, response_model=CompanyResponse)
async def put_company(company_id: str, company: CompanySet, db: Reference = Depends(get_database),
                          current_admin_id: str = Depends(auth.get_current_admin)) -> CompanyResponse:
    """
    Updates a company in the database.

    Parameters:
        company_id (str): The ID of the company to retrieve.
        company (CompanyUpdate): The company data to be updated, parsed from the request body.
        db (Reference): A reference to the Firebase database, injected by FastAPI's dependency injection.
        current_admin_id (str): The ID of the admin to authenticate.

    Returns:
        company (CompanyResponse): The updated company data, retrieved from the database.
    """
    # Convert the GenreUpdate Pydantic model to a dict
    company = company.dict()

    # Delete the data from the manager and return it
    updated_company = management.update(id=company_id,
                                            obj_data=company,
                                            db=db)

    # Convert the dict to a CompanyResponse Pydantic model and return it
    return CompanyResponse(**updated_company)
