import asyncio, json, os
from functools import lru_cache
from pathlib import Path
from dotenv import load_dotenv

load_dotenv(Path(__file__).parent.parent.parent / ".env")

JURISDICTION_PROMPTS = {
    "us": "United States law (common law system)",
    "uk": "United Kingdom law (English common law)",
    "eu": "European Union law (civil law framework)",
    "ae": "UAE law (civil law with Sharia influences)",
    "sa": "Saudi Arabia law (Sharia-based legal system)",
    "jo": "Jordan law (civil law with Sharia influences)",
}

SYSTEM_PROMPT_TEMPLATE = """You are LexMind, an AI legal assistant. Draft professional legal contracts.

Jurisdiction: {legal_system}

Return ONLY valid JSON with this exact structure (no markdown, no code fences):
{{
  "title": "Contract title",
  "content": "Full contract text with proper legal formatting, sections, and clauses",
  "summary": "Brief summary of what this contract does",
  "risk_flags": ["list any potential risks or considerations"]
}}

Include: parties, recitals, clauses, signatures block, governing law.
Keep the language formal and legally precise."""

@lru_cache(maxsize=1)
def _get_client():
    import google.genai as genai
    return genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def _generate_sync(prompt: str, jurisdiction: str) -> str:
    legal_system = JURISDICTION_PROMPTS.get(jurisdiction, "United States law")
    system_prompt = SYSTEM_PROMPT_TEMPLATE.format(legal_system=legal_system)
    client = _get_client()
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=f"User request: {prompt}",
        config={
            "system_instruction": system_prompt,
            "thinking_config": {"thinking_budget": 0},
        },
    )
    return response.text

async def generate_contract(prompt: str, jurisdiction: str = "us") -> dict:
    text = await asyncio.to_thread(_generate_sync, prompt, jurisdiction)
    text = text.strip()
    if text.startswith("```"):
        text = text.split("\n", 1)[1]
        text = text.rsplit("```", 1)[0].strip()

    try:
        return json.loads(text)
    except json.JSONDecodeError:
        return {
            "title": "Generated Contract",
            "content": text,
            "summary": "Contract generated successfully.",
            "risk_flags": ["Review this contract with a qualified attorney before signing."]
        }
