import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

const app = await readFile(new URL("../src/App.tsx", import.meta.url), "utf8");
const navbar = await readFile(
  new URL("../src/components/Navbar.tsx", import.meta.url),
  "utf8",
);
const sidebar = await readFile(
  new URL("../src/components/PerspectivesSidebar.tsx", import.meta.url),
  "utf8",
);
const conversations = await readFile(
  new URL("../src/data/leadershipConversations.tsx", import.meta.url),
  "utf8",
);
const posts = await readFile(
  new URL("../src/data/posts.tsx", import.meta.url),
  "utf8",
);
const listing = await readFile(
  new URL("../src/pages/PerspectivesListingPage.tsx", import.meta.url),
  "utf8",
);

test("Leadership Conversations is available throughout Perspectives navigation", () => {
  for (const source of [app, navbar, sidebar]) {
    assert.match(source, /\/perspectives\/leadership-conversations/);
  }
  assert.match(app, /filterCategory="Leadership Conversations"/);
});

test("the official channel's remaining four videos are published", () => {
  for (const videoId of [
    "qmDoOxE6xY0",
    "kpab4veU-Ak",
    "6kjbn4lqQsA",
    "MaWtOm8jdSw",
  ]) {
    assert.match(conversations, new RegExp(videoId));
  }
});

test("the Partners Meet interview moved exclusively to Leadership Conversations", () => {
  const slug =
    "solidarity-partners-meet-interview-with-dr-harin-kanani-mr-prabh-mehar-singh";
  const postStart = posts.indexOf(`slug: "${slug}"`);
  const postEnd = posts.indexOf("\n  {", postStart);
  const post = posts.slice(postStart, postEnd);

  assert.ok(postStart >= 0, "expected the Partners Meet interview post");
  assert.match(post, /categories: \["Leadership Conversations"\]/);
  assert.match(post, /path: "\/perspectives\/leadership-conversations"/);
  assert.equal(listing.includes(slug), false);
});

test("Disclosure document navigation uses the November 2026 revision", () => {
  assert.match(
    navbar,
    /\/wp-content\/uploads\/2026\/11\/Disclosure-document-Nov-2026-Solidarity\.pdf/,
  );
});

test("the revised disclosure is a non-empty PDF", async () => {
  const disclosureUrl = new URL(
    "../public/wp-content/uploads/2026/11/Disclosure-document-Nov-2026-Solidarity.pdf",
    import.meta.url,
  );
  const [metadata, signature] = await Promise.all([
    stat(disclosureUrl),
    readFile(disclosureUrl).then((file) => file.subarray(0, 5).toString()),
  ]);

  assert.ok(metadata.size > 600_000);
  assert.equal(signature, "%PDF-");
});
