from datetime import datetime
from pydantic import BaseModel


class Recipient(BaseModel):
    recipient_id: str

    class Config:
        from_attributes = True


class RecipientSet(BaseModel):
    agreements: dict


class RecipientResponse(Recipient):
    agreements: dict
    # created_at: datetime


class RecipientDelete(Recipient):
    pass
