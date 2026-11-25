# Rules

Philosophy: minimal, simple, clean. Agent-first, search-agent-optimized. Ugly ok; cluttered not.
Ruthless: cut any token that doesn't change agent behavior.

## Site
- One page: `index.html`. Later: per-product pages via same template.
- No JS. Only `application/ld+json` scripts.
- Static output: HTML, XML, txt. No runtime server.
- Source of truth: `data/products.json`. Never hand-edit generated HTML.
- Build: Node stdlib only. No deps.
- Each product block: `<section id="{slug}">`. Anchor = URL.
- Verdict line first in every block.
- At most one inline `<style>` per page.
- Semantic HTML. One `<h1>`. Headings per product `<h2>`.

## Links
- Ref links: `rel="sponsored nofollow noopener"`.
- No cloaking, no redirect pages.
- Affiliate disclosure above fold. Link `disclosure.html`.
- Dead/redirecting ref link = build fail.

## Search and agent
- Unique `<title>`, meta description, canonical on index.
- JSON-LD: `ItemList` of `Review` (one per product), from same record as HTML.
- Rating markup only with real scores.
- Sitemap: index URL, `lastmod` from data.
- `llms.txt`: one line per product, anchor links.
- `llms-full.txt`: all blocks, plain text.

## Agent
- Smallest change.
- No new deps without asking.
- No model names in commits, PRs, comments, repo files.
- Commit/push/PR only when asked.
- Work on session branch.
- Rule conflict: stop, ask.

## Writing style (agent files)
- Fragments. Drop articles and filler.
- One rule per line. Rationale only if it changes behavior.
- Revisit when product count or page count changes.
