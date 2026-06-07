import re
from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import Response
from app.models.contract import ContractRequest, ContractResponse
from app.services.ai_service import generate_contract
from app.services.pdf_service import generate_pdf
from app.limiter import limiter

router = APIRouter()

def _sanitize_filename(title: str) -> str:
    safe = re.sub(r'[^\w\s-]', '', title).strip()
    return safe[:80] or "contract"

@router.post("/generate", response_model=ContractResponse)
@limiter.limit("20/minute")
async def generate(request: Request, req: ContractRequest):
    try:
        result = await generate_contract(req.prompt, req.jurisdiction)
        return ContractResponse(**result)
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=500, detail="Contract generation failed. Please try again.")

@router.post("/generate/pdf")
@limiter.limit("10/minute")
async def generate_pdf_endpoint(request: Request, req: ContractRequest):
    try:
        result = await generate_contract(req.prompt, req.jurisdiction)
        pdf_data = generate_pdf(result["title"], result["content"])
        filename = _sanitize_filename(result["title"])
        return Response(
            content=pdf_data,
            media_type="application/pdf",
            headers={"Content-Disposition": f"attachment; filename*=UTF-8''{filename}.pdf"}
        )
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=500, detail="PDF generation failed. Please try again.")

@router.get("/health")
async def health():
    return {"status": "ok"}
