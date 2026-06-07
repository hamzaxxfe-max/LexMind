from fastapi import APIRouter, HTTPException
from app.models.contract import ContractRequest, ContractResponse
from app.services.ai_service import generate_contract
from app.services.pdf_service import generate_pdf

router = APIRouter()

@router.post("/generate", response_model=ContractResponse)
async def generate(req: ContractRequest):
    try:
        result = await generate_contract(req.prompt, req.jurisdiction)
        return ContractResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/generate/pdf")
async def generate_pdf_endpoint(req: ContractRequest):
    try:
        result = await generate_contract(req.prompt, req.jurisdiction)
        pdf_data = generate_pdf(result["title"], result["content"])
        from fastapi.responses import Response
        return Response(
            content=pdf_data,
            media_type="application/pdf",
            headers={"Content-Disposition": f'attachment; filename="{result["title"]}.pdf"'}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/health")
async def health():
    return {"status": "ok"}
