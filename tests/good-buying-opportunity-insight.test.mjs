import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const postsPath = new URL("../src/data/posts.tsx", import.meta.url);
const articlePath = new URL(
  "../src/data/goodBuyingOpportunityArticle.ts",
  import.meta.url,
);
const listingPath = new URL(
  "../src/pages/PerspectivesListingPage.tsx",
  import.meta.url,
);
const sidebarPath = new URL(
  "../src/components/PerspectivesSidebar.tsx",
  import.meta.url,
);

test("good buying opportunity insight is the newest built-in blog", async () => {
  const posts = await readFile(postsPath, "utf8");
  const newPostIndex = posts.indexOf(
    'slug: "is-this-a-good-buying-opportunity"',
  );
  const previousPostIndex = posts.indexOf('slug: "resilience-over-speed"');

  assert.notEqual(newPostIndex, -1);
  assert.notEqual(previousPostIndex, -1);
  assert.ok(newPostIndex < previousPostIndex);
  assert.match(posts, /title: "Is this a good buying opportunity\?"/);
  assert.match(posts, /date: "October 15, 2026"/);
  assert.match(posts, /categories: \["Blogs"\]/);
});

test("good buying opportunity article contains the approved CMS draft", async () => {
  const article = await readFile(articlePath, "utf8");

  assert.match(article, /What explains this variance perception\?/);
  assert.match(article, /Margins, ROEs and valuation multiples in India/);
  assert.match(article, /stock picker’s decade/);
  assert.match(article, /continue small investments via top ups/);
});

test("good buying opportunity is listed first in Blogs and Latest Post", async () => {
  const [listing, sidebar] = await Promise.all([
    readFile(listingPath, "utf8"),
    readFile(sidebarPath, "utf8"),
  ]);

  assert.match(
    listing,
    /const BLOGS_SLUG_SEQUENCE = \[\s*\/\/ Page 1\s*"is-this-a-good-buying-opportunity"/,
  );
  assert.match(
    sidebar,
    /const DEFAULT_LATEST_SLUGS = \[\s*'is-this-a-good-buying-opportunity'/,
  );
});
