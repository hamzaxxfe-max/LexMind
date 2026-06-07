import pytest
from unittest.mock import MagicMock, patch
from app.services.ai_service import generate_contract


@pytest.mark.asyncio
async def test_generate_contract_returns_parsed_json():
    mock_response = MagicMock()
    mock_response.text = (
        '{"title": "Test Contract", "content": "Some content", '
        '"summary": "A summary", "risk_flags": ["Flag one"]}'
    )

    with patch("app.services.ai_service._get_client") as mock_get_client:
        mock_client = MagicMock()
        mock_client.models.generate_content.return_value = mock_response
        mock_get_client.return_value = mock_client

        result = await generate_contract("Test", "us")

    assert result["title"] == "Test Contract"
    assert result["risk_flags"] == ["Flag one"]


@pytest.mark.asyncio
async def test_generate_contract_fallback_on_bad_json():
    mock_response = MagicMock()
    mock_response.text = "Not JSON at all"

    with patch("app.services.ai_service._get_client") as mock_get_client:
        mock_client = MagicMock()
        mock_client.models.generate_content.return_value = mock_response
        mock_get_client.return_value = mock_client

        result = await generate_contract("Test", "us")

    assert "Generated Contract" in result["title"]
