from pathlib import Path
from docx import Document
from docx.table import Table as DocxTable
from docx.text.paragraph import Paragraph
from docx.oxml.ns import qn
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph as RP, Spacer, PageBreak, Table, TableStyle, KeepTogether

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "docs" / "proposals" / "Varniqa_Website_Expansion_Options.docx"
OUT = ROOT / "docs" / "proposals" / "Varniqa_Website_Expansion_Options.pdf"
OUT.parent.mkdir(parents=True, exist_ok=True)

NAVY = colors.HexColor("#17324D")
TEAL = colors.HexColor("#2B7A78")
PALE = colors.HexColor("#EAF4F3")
LIGHT = colors.HexColor("#F4F6F8")
MID = colors.HexColor("#667580")
INK = colors.HexColor("#20262B")

styles = getSampleStyleSheet()
body = ParagraphStyle("Body", parent=styles["BodyText"], fontName="Helvetica", fontSize=10.2, leading=13, textColor=INK, spaceAfter=7)
h1 = ParagraphStyle("H1", parent=body, fontName="Helvetica-Bold", fontSize=17, leading=20, textColor=NAVY, spaceBefore=12, spaceAfter=7, keepWithNext=True)
h2 = ParagraphStyle("H2", parent=body, fontName="Helvetica-Bold", fontSize=12.5, leading=15, textColor=TEAL, spaceBefore=8, spaceAfter=4, keepWithNext=True)
bullet = ParagraphStyle("Bullet", parent=body, leftIndent=17, firstLineIndent=-9, bulletIndent=5, spaceAfter=4)
title = ParagraphStyle("Title", parent=body, fontName="Helvetica-Bold", fontSize=27, leading=31, textColor=NAVY, alignment=TA_CENTER, spaceAfter=4)
kicker = ParagraphStyle("Kicker", parent=body, fontName="Helvetica-Bold", fontSize=10, leading=12, textColor=TEAL, alignment=TA_CENTER, spaceAfter=10)
subtitle = ParagraphStyle("Subtitle", parent=body, fontSize=12.5, leading=16, textColor=MID, alignment=TA_CENTER, spaceAfter=18)
cell = ParagraphStyle("Cell", parent=body, fontSize=9.1, leading=11, spaceAfter=0)
cell_bold = ParagraphStyle("CellBold", parent=cell, fontName="Helvetica-Bold", textColor=NAVY)
cell_head = ParagraphStyle("CellHead", parent=cell, fontName="Helvetica-Bold", textColor=colors.white, alignment=TA_CENTER)

def esc(text):
    return text.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

def blocks(parent):
    for child in parent.element.body.iterchildren():
        if child.tag == qn("w:p"):
            yield Paragraph(child, parent)
        elif child.tag == qn("w:tbl"):
            yield DocxTable(child, parent)

def page_break_in(p):
    return bool(p._p.xpath('.//w:br[@w:type="page"]'))

def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica-Bold", 8)
    canvas.setFillColor(MID)
    canvas.drawRightString(letter[0] - .85*inch, letter[1] - .38*inch, "VARNIQA SKIN SCIENCES  |  WEBSITE EXPANSION")
    canvas.setFont("Helvetica", 8)
    canvas.drawCentredString(letter[0]/2, .32*inch, f"Website structure proposal  |  August 2026  |  {doc.page}")
    canvas.restoreState()

d = Document(SRC)
story = []
paragraph_index = 0
table_index = 0
for b in blocks(d):
    if isinstance(b, Paragraph):
        text = b.text.strip()
        if page_break_in(b):
            story.append(PageBreak())
        if not text:
            continue
        paragraph_index += 1
        name = b.style.name
        if name == "Heading 1":
            story.append(RP(esc(text), h1))
        elif name == "Heading 2":
            story.append(RP(esc(text), h2))
        elif name.startswith("List Bullet"):
            story.append(RP(esc(text), bullet, bulletText="•"))
        elif paragraph_index == 1:
            story.append(Spacer(1, 8)); story.append(RP(esc(text), kicker))
        elif paragraph_index == 2:
            story.append(RP(esc(text), title))
        elif paragraph_index == 3:
            story.append(RP(esc(text), subtitle))
        else:
            # Preserve direct emphasis for lead/recommendation lines.
            is_bold = any(r.bold for r in b.runs if r.text.strip())
            is_teal = any(getattr(r.font.color, "rgb", None) and str(r.font.color.rgb) == "2B7A78" for r in b.runs)
            st = ParagraphStyle("LeadTemp", parent=body, fontName="Helvetica-Bold" if is_bold else "Helvetica", textColor=TEAL if is_teal else INK, fontSize=10.8 if is_bold else 10.2)
            story.append(RP(esc(text), st))
    else:
        table_index += 1
        data = []
        for ri, row in enumerate(b.rows):
            vals = []
            for ci, c in enumerate(row.cells):
                txt = "<br/>".join(esc(p.text.strip()) for p in c.paragraphs if p.text.strip())
                if table_index == 3 and ri == 0:
                    st = cell_head
                elif table_index == 3 and ci == 0 and ri > 0:
                    st = cell_bold
                elif table_index in (1,) or (table_index == 3 and ri == 0):
                    st = cell_head
                else:
                    st = cell
                vals.append(RP(txt, st))
            data.append(vals)
        if table_index == 1:
            widths = [3.25*inch, 3.25*inch]
            ts = [("BACKGROUND", (0,0), (0,-1), NAVY), ("BACKGROUND", (1,0), (1,-1), TEAL)]
        elif table_index == 3:
            widths = [1.46*inch, 2.52*inch, 2.52*inch]
            ts = [("BACKGROUND", (0,0), (-1,0), NAVY), ("BACKGROUND", (0,1), (0,-1), LIGHT)]
        else:
            widths = [6.5*inch]
            ts = [("BACKGROUND", (0,0), (-1,-1), PALE)]
        t = Table(data, colWidths=widths, repeatRows=1 if table_index == 3 else 0, hAlign="LEFT")
        t.setStyle(TableStyle(ts + [
            ("GRID", (0,0), (-1,-1), .5, colors.HexColor("#C7D1D8")),
            ("VALIGN", (0,0), (-1,-1), "MIDDLE"),
            ("LEFTPADDING", (0,0), (-1,-1), 8), ("RIGHTPADDING", (0,0), (-1,-1), 8),
            ("TOPPADDING", (0,0), (-1,-1), 7), ("BOTTOMPADDING", (0,0), (-1,-1), 7),
        ]))
        story.extend([Spacer(1, 3), t, Spacer(1, 7)])

pdf = SimpleDocTemplate(str(OUT), pagesize=letter, rightMargin=.85*inch, leftMargin=.85*inch, topMargin=.62*inch, bottomMargin=.58*inch, title="Varniqa Skin Sciences - Website Expansion Options", author="Varniqa Website Team")
pdf.build(story, onFirstPage=header_footer, onLaterPages=header_footer)
print(OUT)
