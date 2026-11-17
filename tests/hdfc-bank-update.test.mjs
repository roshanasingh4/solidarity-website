import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const projectRoot = path.resolve(import.meta.dirname, "..");
const postsSource = fs.readFileSync(
  path.join(projectRoot, "src/data/posts.tsx"),
  "utf8",
);
const listingSource = fs.readFileSync(
  path.join(projectRoot, "src/pages/PerspectivesListingPage.tsx"),
  "utf8",
);
const pdfPath = path.join(
  projectRoot,
  "public/wp-content/uploads/2026/11/Update-on-HDFC-Bank-17-November-2026.pdf",
);

test("publishes the HDFC Bank update in company perspectives", () => {
  assert.match(postsSource, /title: "Update on HDFC Bank Ltd"/);
  assert.match(postsSource, /date: "November 17, 2026"/);
  assert.match(postsSource, /categories: \["Company Perspective"\]/);
  assert.match(postsSource, /href="\/wp-content\/uploads\/2026\/11\/Update-on-HDFC-Bank-17-November-2026\.pdf"/);
  assert.match(
    listingSource,
    /const COMPANY_PERSPECTIVE_SLUG_SEQUENCE = \[\s*\/\/ Page 1\s*"update-on-hdfc-bank-ltd"/,
  );
  assert.equal(fs.existsSync(pdfPath), true);
  assert.ok(fs.statSync(pdfPath).size > 300_000);
});
