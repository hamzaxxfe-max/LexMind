from pydantic import BaseModel, field_validator

VALID_JURISDICTIONS = {"us", "uk", "eu", "ae", "sa", "jo"}

class ContractRequest(BaseModel):
    prompt: str
    jurisdiction: str = "us"

    @field_validator("prompt")
    @classmethod
    def prompt_min_length(cls, v):
        stripped = v.strip()
        if len(stripped) < 10:
            raise ValueError("prompt must be at least 10 characters")
        return stripped

    @field_validator("jurisdiction")
    @classmethod
    def valid_jurisdiction(cls, v):
        if v not in VALID_JURISDICTIONS:
            raise ValueError(f"unsupported jurisdiction: {v}")
        return v

class ContractResponse(BaseModel):
    title: str
    content: str
    summary: str
    risk_flags: list[str]
