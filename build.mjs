// Build static site from products.json. Node stdlib only.
// Usage: node build.mjs
import { readFile, writeFile, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const { site, products } = JSON.parse(
  await readFile(join(root, "products.json"), "utf8"),
);

// --- validate ---------------------------------------------------------------
const fail = (msg) => {
  console.error(`build failed: ${msg}`);
  process.exit(1);
};
const slugs = new Set();
for (const p of products) {
  for (const k of ["slug", "name", "description", "ref"]) {
    if (typeof p[k] !== "string" || !p[k].trim()) fail(`${p.slug ?? "?"}: missing ${k}`);
  }
  if (!/^[a-z0-9-]+$/.test(p.slug)) fail(`${p.slug}: slug must be [a-z0-9-]`);
  if (slugs.has(p.slug)) fail(`duplicate slug ${p.slug}`);
  slugs.add(p.slug);
  if (!p.ref.startsWith("https://")) fail(`${p.slug}: ref must be https`);
}

// --- helpers ----------------------------------------------------------------
const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const jsonld = (obj) =>
  JSON.stringify(obj).replace(/</g, "\\u003c"); // keep </script> out of data

// --- index.html -------------------------------------------------------------
const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: products.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Product",
      name: p.name,
      description: p.description,
      url: `${site.url}#${p.slug}`,
    },
  })),
};

const blocks = products
  .map(
    (p) => `  <section id="${esc(p.slug)}">
    <h2>${esc(p.name)}</h2>
    <p>${esc(p.description)}</p>
    <p><a href="${esc(p.ref)}" rel="sponsored nofollow noopener">Visit ${esc(p.name)}</a></p>
  </section>`,
  )
  .join("\n");

const index = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(site.title)}</title>
<meta name="description" content="${esc(site.description)}">
<link rel="canonical" href="${esc(site.url)}">
<style>
body{font:16px/1.5 system-ui,sans-serif;max-width:40rem;margin:0 auto;padding:1rem;color:#111}
section{margin:0 0 2rem}
.disclosure{font-size:.875rem;color:#555}
</style>
<script type="application/ld+json">${jsonld(itemList)}</script>
</head>
<body>
<h1>${esc(site.title)}</h1>
<p class="disclosure">${esc(site.disclosure)}</p>
<main>
${blocks}
</main>
</body>
</html>
`;

// --- sitemap, robots, llms --------------------------------------------------
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${esc(site.url)}</loc></url>
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${site.url}sitemap.xml
`;

const llms = `# ${site.title}

> ${site.description}

${products.map((p) => `- [${p.name}](${site.url}#${p.slug}): ${p.description}`).join("\n")}
`;

// --- write ------------------------------------------------------------------
const outputs = {
  "index.html": index,
  "sitemap.xml": sitemap,
  "robots.txt": robots,
  "llms.txt": llms,
};

for (const [name, body] of Object.entries(outputs)) {
  await writeFile(join(root, name), body);
}

// Remove stale output from the old multipage/disclosure layout.
await rm(join(root, "disclosure.html"), { force: true });

// Rule: no <script> except ld+json.
const scripts = (index.match(/<script/g) || []).length;
const ld = (index.match(/type="application\/ld\+json"/g) || []).length;
if (scripts !== ld) fail("non-ld+json <script> in output");

console.log(`built ${products.length} product(s) -> ${Object.keys(outputs).join(", ")}`);
