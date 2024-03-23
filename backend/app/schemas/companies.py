from datetime import datetime
from pydantic import BaseModel


class Company(BaseModel):
    company_id: str

    class Config:
        from_attributes = True


class CompanySet(BaseModel):
    agreements: dict


class CompanyResponse(Company):
    agreements: dict
    # created_at: datetime


class CompanyDelete(Company):
    pass
