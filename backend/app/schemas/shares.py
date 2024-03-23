from datetime import datetime
from pydantic import BaseModel


class Share(BaseModel):
    share_id: str

    class Config:
        from_attributes = True


class ShareSet(BaseModel):
    infos: dict


class ShareResponse(Share):
    infos: dict
    # created_at: datetime


class ShareDelete(Share):
    pass
