from io import BytesIO
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor

def generate_pdf(title: str, content: str) -> bytes:
    buffer = BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)

    styles = getSampleStyleSheet()
    title_style = ParagraphStyle(
        "CustomTitle",
        parent=styles["Title"],
        fontSize=18,
        textColor=HexColor("#1A4C38"),
        spaceAfter=20,
    )
    body_style = ParagraphStyle(
        "CustomBody",
        parent=styles["Normal"],
        fontSize=11,
        leading=15,
        spaceAfter=10,
    )

    elements = []
    elements.append(Paragraph(title, title_style))
    elements.append(Spacer(1, 12))

    for line in content.split("\n"):
        line = line.strip()
        if not line:
            continue
        if line.isupper() or line.endswith(":"):
            style = ParagraphStyle(
                "Heading",
                parent=styles["Heading2"],
                fontSize=13,
                textColor=HexColor("#1A4C38"),
                spaceAfter=6,
                spaceBefore=12,
            )
            elements.append(Paragraph(line, style))
        else:
            elements.append(Paragraph(line, body_style))

    doc.build(elements)
    pdf_data = buffer.getvalue()
    buffer.close()
    return pdf_data
