#!/usr/bin/env python3
"""Generate the Mamata Company Perspective HTML from the supplied source PDF."""

from __future__ import annotations

import argparse
import html
import re
import subprocess
import tempfile
from pathlib import Path

from PIL import Image


HEADINGS = {
    "Summary",
    "What do they do?",
    "Product portfolio",
    "Brief history of Mamata Machinery",
    "Mamata Machinery has demonstrated healthy growth over long periods of time",
    "Growth has been accompanied by improvement in earnings quality, resilience in business model.",
    "Business evolution over time",
    "Business evolution has translated to better economics over time",
    "Mamata Machinery is very well positioned for sustainable growth over long periods of time",
    "The flexible packaging industry is a large and growing opportunity",
    "Mamata has a unique offering in recyclable technology which can be a meaningful growth contributor in the medium to long term",
    "Mamata is well positioned within the large & growing flexible packaging machinery global industry",
    "Mamata Machinery is uniquely positioned within the Indian packaging machinery industry",
    "Mamata has demonstrated faster growth, superior margins and ROIC %",
    "We received very positive feedback on Mamata from both customers & peers suggesting a strong competitive edge",
    "Profit growth at mid to high teens should be faster than topline growth",
    "Mamata enjoys healthy ROIC backed by strong competitive positioning and technology edge",
    "This is a wide moat business as building technical expertise requires deep domain knowledge",
    "Mamata’s moat translates to healthy ROIC",
    "Leadership team longevity inspires trust",
    "We believe our buying price offers reasonable valuations for an initial position",
    "Appendix",
    "Examples of Mamata’s products",
    "Disclaimer",
}

FIGURES = {
    "Examples of Mamata Machinery’s products.": (
        "/wp-content/uploads/2026/08/mamata-machinery-product-range.png",
        "Examples of Mamata pouch-making, blown-film and packaging machines",
    ),
    "Source: Ace Equity.": (
        "/wp-content/uploads/2026/08/mamata-machinery-ten-year-growth.png",
        "Ten-year growth chart showing sales CAGR of 12% and EBITDA CAGR of 21%",
    ),
    "With packaging machinery, Mamata can now directly target the brand owners as customers. With a strong installed base globally, Mamata has done the difficult part of building trust with marquee customers. These names should act as strong reference to onboard new customers.": (
        "/wp-content/uploads/2026/08/mamata-machinery-customer-examples.png",
        "Examples of Mamata customers across co-extrusion, converting and packaging",
    ),
    "Mamata is well positioned within the large & growing flexible packaging machinery global industry": (
        "/wp-content/uploads/2026/08/mamata-machinery-market-positioning.png",
        "Flexible packaging machinery market tiers and Mamata's mid-market positioning",
    ),
    "Mamata has demonstrated faster growth, superior margins and ROIC %": (
        "/wp-content/uploads/2026/08/mamata-machinery-peer-comparison.png",
        "Mamata versus Indian packaging machinery peers from FY19 to FY25",
    ),
}

SKIP_CHART_PHRASES = (
    "Top tier",
    "Mamata vs peers FY19-25",
)


def semantic_table(caption: str, headers: list[str], rows: list[list[str]]) -> str:
    head = "".join(f"<th scope=\"col\">{html.escape(cell)}</th>" for cell in headers)
    body = "".join(
        "<tr>" + "".join(
            (f"<th scope=\"row\">{html.escape(cell)}</th>" if index == 0 else f"<td>{html.escape(cell)}</td>")
            for index, cell in enumerate(row)
        ) + "</tr>"
        for row in rows
    )
    return (
        f'<div class="wp-block-table" role="region" aria-label="{html.escape(caption)}" tabindex="0">'
        f'<table><caption>{html.escape(caption)}</caption><thead><tr>{head}</tr></thead>'
        f"<tbody>{body}</tbody></table></div>"
    )


TABLES = {
    "Product What does it do": semantic_table("Product portfolio", ["Product", "What does it do", "% of FY26 sales"], [
        ["Co-extrusion machinery", "Produces multi-layer plastic films from plastic pellets.", "15%"],
        ["Converting machinery (bag & pouch making machines)", "Converts rolls of plastic film into bags and pouches.", "47%"],
        ["Packaging machinery", "End-of-line packaging equipment used to fill and seal the food product.", "21%"],
        ["Attachments & spares", "Attachments sold alongside the initial sale or in the aftermarket.", "14%"],
        ["After-sales service", "Troubleshooting remotely or physically.", "3%"],
    ]),
    "Particulars Decade back": semantic_table("Business evolution over time", ["Particulars", "A decade ago", "At present"], [
        ["Business model", "Converting-machinery specialist", "Comprehensive flexible-packaging machinery solutions provider"],
        ["Product range", "Mainly converting machinery; 3/5-layer blown film; HFFS only", "Co-extrusion; VFFS and secondary packaging; recyclable mono-material film; five patents granted and three pending"],
        ["End industries", "Garment and ecommerce", "Food & beverage, FMCG and pharma"],
        ["Customers", "Mainly converters; concentrated in India and the US", "Converters and B2C brand owners; no customer above 10% of sales"],
        ["Geography", "About 20% exports, focused on the US", "63% exports across 80+ countries"],
    ]),
    "Key financial metrics FY15": semantic_table("Business economics over time", ["Metric", "FY15", "FY19", "FY24", "FY25", "FY26"], [
        ["Sales (Rs Cr)", "84", "100", "237", "255", "233"], ["Gross margin", "57%", "55%", "57%", "61%", "55%"],
        ["EBITDA margin", "9%", "8%", "20%", "21%", "10%"], ["Net profit margin", "0%", "2%", "15%", "16%", "6%"],
        ["Pre-tax ROIC", "5%", "10%", "47%", "50%", "14%"], ["Inventory days", "153", "133", "107", "117", "115"],
        ["Debtor days", "82", "61", "58", "45", "63"], ["Creditor days", "90", "95", "44", "39", "40"],
        ["Customer advance days", "35", "30", "72", "54", "47"], ["Working capital days", "148", "80", "40", "58", "95"],
        ["Net debt / EBITDA", "5.9", "1.3", "-0.9", "-1.2", "-2.8"], ["GFA turns", "1.66", "2.13", "3.31", "3.48", "3.10"],
        ["NFA turns", "2.25", "3.34", "3.84", "4.07", "3.58"],
    ]),
    "Flexible packaging Particulars": semantic_table("Flexible packaging opportunity", ["Particulars", "Converting", "Co-extrusion", "Primary packaging", "Secondary packaging"], [
        ["Year entered", "1989", "1997", "2011", "2026"], ["FY26 revenue", "~Rs 110 Cr", "~Rs 35 Cr", "~Rs 50 Cr", "Nil"],
        ["India TAM", "Rs 150 Cr", "Rs 900 Cr", "Rs 850 Cr", "Rs 500 Cr"], ["Global TAM", "Rs 1,500 Cr", "~Rs 9,000 Cr", "$2.5bn", "$1.25bn"],
    ]),
    "Expert Feedback": semantic_table("Customer and peer feedback", ["Expert", "Feedback"], [
        ["FMCG MNC customer", "Premium challenger versus Indian peers and a value challenger versus MNCs; strong total cost of ownership and custom engineering."],
        ["Indian sustainable-packaging customer", "Strong willingness to innovate, with better quality and after-sales service than Indian peers."],
        ["MNC confectionery customer", "More affordable over the machine lifecycle despite higher material loss than an MNC alternative."],
        ["Indian snack and namkeen customer", "Establishes the product and quality completely before selling aggressively."],
        ["Middle East customer", "Can compete with European companies on quality."],
        ["Co-extrusion competitor", "Ahead of the curve in India; the technology is difficult to replicate and the recyclable-film machines are unique."],
        ["Packaging-machinery competitor", "High-speed snack-food machines compare with European technology at an Indian price."],
    ]),
    "5 years out Comments": semantic_table("Steady-state ROIC scenarios", ["Metric", "FY25", "FY26", "Scenario 1", "Scenario 2"], [
        ["Sales index", "100", "100", "100", "100"], ["Gross profit margin", "61%", "55%", "62%", "63%"],
        ["EBITDA margin", "21%", "10%", "22%", "25%"], ["Core PAT margin", "14.6%", "5.6%", "15%", "18%"],
        ["GFA turns", "3.5", "3.1", "4.1", "4.1"], ["NFA turns", "4.1", "3.6", "6.6", "6.6"],
        ["NWC days", "58", "95", "60", "60"], ["Pre-tax ROIC", "50%", "14%", "53%", "61%"],
    ]),
    "Name Designation Time with Mamata": semantic_table("Leadership team longevity", ["Name", "Designation", "Years with Mamata", "Industry experience"], [
        ["Apurva Kane", "CEO", "41+", "41+"], ["Dipak Modi", "CFO", "26+", "33+"], ["Madhuri Sharma", "CS & Compliance Officer", "15+", "15+"],
        ["Rajashekar Venkat", "President", "1+", "28+"], ["Dharmisth Patel", "President – MEI", "21+", "21+"],
        ["Prashant H. Pandya", "Business Head – VFFS", "4+", "41+"], ["Dharmendra Panchal", "Business Head – Converting", "35+", "37+"],
        ["Snehal Patel", "Business Head – HFFS", "34+", "34+"], ["Hemang Mistry", "Senior Manager Design", "28+", "28+"],
        ["Jignesh Shah", "IT Head", "26+", "26+"], ["Kishan Patel", "HR & Admin Head", "20+", "34+"],
    ]),
    "1) Blown film lines": semantic_table("Blown-film lines", ["Machine", "What it does"], [
        ["3-layer blown-film lines", "Entry-level line for general food, industrial and consumer films."],
        ["5- & 7-layer blown-film lines", "Higher barrier strength and seal performance for edible oil, dairy and frozen food."],
        ["9-layer blown-film lines", "Advanced line for ultra-barrier food, recyclable film and pharma applications."],
    ]),
    "2) Converting machines": semantic_table("Converting machines", ["Machine", "What it does"], [
        ["Win 305 CP / Win 410 CP", "Compact pouch-making for powders, spices and industrial packs."],
        ["Win/Terra/Vega PM series", "Mid-to-large pouch formats, zipper and recyclable stand-up pouches."],
        ["Vega Plus series", "High-speed multi-format centre-seal, lap-seal, zipper, stand-up, pet-food, vacuum and recyclable pouches."],
        ["Vega 285 PM / Spout", "Zipper and spout pouches for liquids and beverages."],
        ["Vega side-seal series", "Shopping, garment, courier and easy-open bags."],
        ["Vega bottom-seal series", "Patch-handle, tissue-roll, pet-food and bulk industrial bags."],
        ["Vega W series", "Bread, poultry, sanitary-napkin and diaper bags."],
    ]),
    "3) Packaging machines": semantic_table("Packaging machines", ["Machine", "What it does"], [
        ["HFFS – VegaPack M-Series", "Horizontally forms, fills and seals stand-up pouches."],
        ["PFS pick-fill-seal", "Fills and seals pre-made pouches with fast format changeovers."],
        ["VFFS – VFC 230", "Vertically forms, fills and seals pillow and gusseted pouches."],
        ["Multi-lane sachet machine", "Produces multiple four-side-seal sachets simultaneously."],
        ["Spout pouching machine", "Fills and seals spout pouches for beverages, sauces and personal care."],
        ["SPH 100 secondary packaging", "Groups and prepares finished pouches for cartons and cases."],
    ]),
}

SKIP_TABLE_CONTINUATIONS = (
    "5 patents granted, 3 pending",
    "NFA turns",
    "Depreciation % of sales",
    "Net liability days",
    "Indian snack &",
    "“For HFFS",
    "Mamata vs peers FY19-25",
    "80% 72%",
    "60% 46%",
    "40% 32%",
    "Mamata Machinery Rajoo Engineers",
    "Mid market",
    "“MNC very positive on Rectech",
)


def normalise(lines: list[str]) -> str:
    return re.sub(r"\s+", " ", " ".join(line.strip() for line in lines)).strip()


def figure_markup(src: str, alt: str) -> str:
    return (
        '<figure class="article-figure">'
        f'<img src="{src}" alt="{html.escape(alt)}" loading="lazy" />'
        f'<figcaption>{html.escape(alt)}</figcaption>'
        "</figure>"
    )


def block_to_html(block: list[str]) -> str:
    joined = normalise(block)
    if not joined or "P a g e |" in joined:
        return ""
    if any(phrase in joined for phrase in SKIP_CHART_PHRASES) and len(block) > 4:
        return ""

    first = block[0].strip()
    if "We received very positive feedback on Mamata" in joined and "Expert Feedback" in joined:
        return (
            '<h3>We received very positive feedback on Mamata from both customers &amp; peers '
            'suggesting a strong competitive edge</h3>' + TABLES["Expert Feedback"]
        )
    for marker, markup in TABLES.items():
        if joined.startswith(marker):
            return markup
    if joined.startswith(SKIP_TABLE_CONTINUATIONS):
        return ""
    heading = next((h for h in HEADINGS if first == h or joined == h), None)
    if heading:
        level = "h2" if heading in {"Summary", "Appendix", "Disclaimer"} else "h3"
        result = f"<{level}>{html.escape(heading)}</{level}>"
        if heading in FIGURES:
            result += figure_markup(*FIGURES[heading])
        if len(block) > 1:
            result += block_to_html(block[1:])
        return result

    if any("•" in line for line in block):
        prefix: list[str] = []
        items: list[str] = []
        current: list[str] = []
        seen_bullet = False
        for line in block:
            stripped = line.strip()
            if stripped.startswith("•"):
                seen_bullet = True
                if current:
                    items.append(normalise(current))
                current = [stripped[1:].strip()]
            elif not seen_bullet:
                prefix.append(stripped)
            else:
                current.append(stripped)
        if current:
            items.append(normalise(current))
        rendered = "".join(f"<li>{html.escape(item)}</li>" for item in items if item)
        intro = f"<p>{html.escape(normalise(prefix))}</p>" if prefix else ""
        result = intro + f'<ul class="wp-block-list">{rendered}</ul>'
        for marker, figure in FIGURES.items():
            if marker in joined:
                result += figure_markup(*figure)
        return result

    # Layout-preserved table blocks remain selectable and horizontally scrollable.
    aligned_lines = sum(bool(re.search(r"\S\s{2,}\S", line)) for line in block)
    if len(block) >= 3 and aligned_lines >= max(2, len(block) // 3):
        label = first.rstrip(":") or "Article table"
        return (
            f'<div class="article-data-table" role="region" aria-label="{html.escape(label)}" tabindex="0">'
            f"<pre>{html.escape(chr(10).join(line.rstrip() for line in block))}</pre></div>"
        )

    escaped = html.escape(joined)
    result = f'<p class="article-note">{escaped}</p>' if re.match(r"^\d+\s", joined) else f"<p>{escaped}</p>"
    if joined in FIGURES:
        result += figure_markup(*FIGURES[joined])
    return result


def generate(pdf: Path, render_dir: Path, output: Path, asset_dir: Path) -> None:
    with tempfile.NamedTemporaryFile(suffix=".txt") as temp:
        layout = Path(temp.name)
        subprocess.run(["pdftotext", "-layout", str(pdf), str(layout)], check=True)
        pages = layout.read_text(encoding="utf-8").split("\f")[1:]

    blocks: list[str] = []
    for page in pages:
        clean_lines = [line for line in page.splitlines() if "SOLIDARITY" not in line]
        current: list[str] = []
        for line in clean_lines + [""]:
            if line.strip():
                current.append(line)
            elif current:
                rendered = block_to_html(current)
                if rendered:
                    blocks.append(rendered)
                current = []

    pdf_href = "/wp-content/uploads/2026/08/Mamata-Machinery-Investment-Thesis-31-August-2026.pdf"
    blocks.append(
        '<p class="article-download"><a href="' + pdf_href + '" target="_blank" rel="noopener noreferrer" '
        'aria-label="Download Investment Thesis on Mamata Machinery PDF (opens in a new tab)">'
        "Download the original Investment Thesis on Mamata Machinery (PDF)</a></p>"
    )
    content = "\n\n".join(blocks)
    source = (
        "// Generated from the source PDF by scripts/generate-mamata-article.py.\n"
        "export const mamataMachineryExcerpt = `"
        "<h3>Summary</h3><p>Mamata Machinery makes flexible plastic packaging machinery and has repeatedly expanded into new segments. Solidarity sees multiple long-term growth engines, strong proprietary technology, an asset-light model and a highly experienced professional leadership team.</p>`;\n\n"
        "export const mamataMachineryContent = `\n" + content.replace("`", "&#96;") + "\n`;\n"
    )
    output.write_text(source, encoding="utf-8")

    asset_dir.mkdir(parents=True, exist_ok=True)
    crops = [
        (3, (96, 582, 690, 900), "mamata-machinery-product-range.png"),
        (5, (94, 94, 565, 392), "mamata-machinery-ten-year-growth.png"),
        (9, (95, 430, 676, 735), "mamata-machinery-customer-examples.png"),
        (11, (94, 96, 780, 456), "mamata-machinery-market-positioning.png"),
        (12, (95, 292, 720, 531), "mamata-machinery-peer-comparison.png"),
    ]
    for page, box, filename in crops:
        with Image.open(render_dir / f"page-{page:02d}.png") as image:
            image.crop(box).save(asset_dir / filename, optimize=True)


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf", type=Path)
    parser.add_argument("render_dir", type=Path)
    args = parser.parse_args()
    output = Path("src/data/mamataMachineryArticle.ts")
    # Rendered pages live beside the source audit directory; the second argument
    # is retained explicitly so generation never guesses an unrelated location.
    generate(
        args.pdf,
        args.render_dir,
        output,
        Path("public/wp-content/uploads/2026/08"),
    )


if __name__ == "__main__":
    main()
