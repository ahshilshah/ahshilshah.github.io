# Rules

Philosophy: simple, minimal, agent-first, clean. Ugly ok; cluttered not.

## Site
- No JS. Only `application/ld+json` scripts allowed.
- Static output: HTML, XML, txt.
- Source of truth: `data/products.json`. Never hand-edit generated HTML.
- Build: Node stdlib only. No deps.
- Multipage: 1 page per product + index.
- Verdict line first in every review.
- At most one inline `<style>` per page.

## Links
- Ref links: `rel="sponsored nofollow noopener"`.
- No cloaking, no redirect pages.
- Affiliate disclosure above fold on pages with ref links. Link `disclosure.html`.
- Dead/redirecting ref link = build fail.

## SEO/AEO
- Unique title, meta description, canonical per page.
- JSON-LD Product + Review from same record as HTML.
- Rating markup only with real scores.
- Sitemap lastmod from data.
- llms.txt: every page, one line each.

## Agent
- Smallest change.
- No new deps without asking.
- No commit/push/PR unless asked.
- No model names in commits, PRs, comments, repo files.
- Work on session branch.
- Rule conflict: stop, ask.

## Writing style (this file and all agent files)
- Fragments over sentences. Drop articles, filler.
- One rule per line. No rationale unless it changes behavior.
