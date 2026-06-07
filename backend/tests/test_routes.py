import pytest


@pytest.mark.asyncio
async def test_health(client):
    resp = await client.get("/api/health")
    assert resp.status_code == 200
    assert resp.json() == {"status": "ok"}


@pytest.mark.asyncio
async def test_generate_validates_short_prompt(client):
    resp = await client.post("/api/generate", json={"prompt": "short"})
    assert resp.status_code == 422


@pytest.mark.asyncio
async def test_generate_validates_jurisdiction(client):
    resp = await client.post("/api/generate", json={"prompt": "a" * 20, "jurisdiction": "xx"})
    assert resp.status_code == 422


@pytest.mark.asyncio
async def test_generate_pdf_validates_prompt(client):
    resp = await client.post("/api/generate/pdf", json={"prompt": ""})
    assert resp.status_code == 422
