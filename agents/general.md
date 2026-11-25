# Rules

Philosophy: minimal, simple, clean. Agent-first, search-agent-optimized. Ugly ok; cluttered not.
Ruthless: cut any token that doesn't change agent behavior.

## Site
- One page: `index.html`. Later: per-product pages, same template.
- No JS.
- Static output: HTML, XML, txt. No runtime server.
- Source of truth: `data/products.json`. Never hand-edit generated HTML.
- Build: Node stdlib only. No deps.
- Product fields: `slug`, `name`, `description`, `ref`. Nothing else for now.
- Block: `<section id="{slug}">`, `<h2>` name, description, ref link. Anchor = URL.
- At most one inline `<style>` per page.
- Semantic HTML. One `<h1>`.

## Links
- Ref links: `rel="sponsored nofollow noopener"`.
- No cloaking, no redirect pages.
- Affiliate disclosure above fold, on index. No separate page.
- Dead/redirecting ref link = build fail.

## Search and agent
- Unique `<title>`, meta description, canonical on index.
- `sitemap.xml`: index URL.
- `llms.txt`: one line per product, anchor link.
- Skip reviews, scores, JSON-LD until asked.

## Agent
- Smallest change.
- No new deps without asking.
- No model names in commits, PRs, comments, repo files.
- Work on `main` only. No other branches.
- Push to `main` by default. No PR unless asked.
- Before every commit to `main`: `node build.mjs`, commit generated files too.
- Commit message: no model names. Session trailer ok.
- Rule conflict: stop, ask.

## Writing style (agent files)
- Fragments. Drop articles and filler.
- One rule per line. Rationale only if it changes behavior.
- Revisit when product count or page count changes.
