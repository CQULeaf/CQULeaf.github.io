"""Check math-post labels, bilingual pairing, and built output after build.sh."""
import re
from pathlib import Path

root = Path(__file__).resolve().parents[1]
posts = {}
for path in (root / "_posts").glob("*.md"):
    source = path.read_text()
    frontmatter, body = source.split("---", 2)[1:]
    if not re.search(r"^math: true$", frontmatter, re.M):
        continue
    route = re.search(r"^permalink: (.+)$", frontmatter, re.M)[1]
    translation = re.search(r"^translation_url: (.+)$", frontmatter, re.M)[1]
    labels = re.findall(r"\\label\{([^}]+)\}", body)
    references = re.findall(r"\\(?:eqref|ref)\{([^}]+)\}", body)
    assert len(labels) == len(set(labels)), f"{path}: duplicate labels"
    assert set(references) <= set(labels), f"{path}: unresolved references"
    html = (root / "_site" / route.strip("/") / "index.html").read_text()
    assert html.count("MathJax.js?config=") == 1, f"{path}: MathJax must load once"
    assert 'autoNumber: "all"' in html, f"{path}: numbering is disabled"
    assert 'class="blog-post math-post"' in html, f"{path}: missing math styles"
    if "{: .three-line}" in body:
        assert '<table class="three-line">' in html, f"{path}: missing table class"
    posts[route] = (translation, labels, references)

for route, (translation, labels, references) in posts.items():
    assert translation in posts, f"{route}: missing math translation"
    assert posts[translation] == (route, labels, references), f"{route}: translations differ"

assert posts, "No math posts found"
print(f"Checked {len(posts)} math posts: labels, translations, and generated markup OK")
