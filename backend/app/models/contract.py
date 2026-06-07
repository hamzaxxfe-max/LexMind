from pydantic import BaseModel

class ContractRequest(BaseModel):
    prompt: str
    jurisdiction: str = "us"

class ContractResponse(BaseModel):
    title: str
    content: str
    summary: str
    risk_flags: list[str]
