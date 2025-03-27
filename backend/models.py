from pydantic import BaseModel
from typing import List, Optional

class SummaryRequest(BaseModel):
    query: str
    type: Optional[str] = None

class SummaryResponse(BaseModel):
    summary: str
    raw_facts: str
    sources: List[str]
    trace: dict
