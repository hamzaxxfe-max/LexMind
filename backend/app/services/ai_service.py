import os, json
from dotenv import load_dotenv

load_dotenv()

JURISDICTION_PROMPTS = {
    "us": "United States law (common law system)",
    "uk": "United Kingdom law (English common law)",
    "eu": "European Union law (civil law framework)",
    "ae": "UAE law (civil law with Sharia influences)",
    "sa": "Saudi Arabia law (Sharia-based legal system)",
    "jo": "Jordan law (civil law with Sharia influences)",
}

async def generate_contract(prompt: str, jurisdiction: str = "us") -> dict:
    import google.genai as genai

    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
    legal_system = JURISDICTION_PROMPTS.get(jurisdiction, "United States law")

    system_prompt = f"""You are LexMind, an AI legal assistant. Draft professional legal contracts.

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

    response = client.models.generate_content(
        model="gemini-3.1-flash-lite",
        contents=f"{system_prompt}\n\nUser request: {prompt}",
    )
    text = response.text.strip()
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
