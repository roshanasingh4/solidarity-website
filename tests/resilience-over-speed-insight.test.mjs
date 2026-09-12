import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const postsPath = new URL('../src/data/posts.tsx', import.meta.url)
const listingPath = new URL('../src/pages/PerspectivesListingPage.tsx', import.meta.url)
const pdfPath = new URL(
  '../public/wp-content/uploads/2026/09/Resilience-over-Speed-Ashoka-12-Sep-2026.pdf',
  import.meta.url,
)

test('Resilience over Speed is an Insight with the requested display date and accessible PDF link', async () => {
  const [posts, listing, pdf] = await Promise.all([
    readFile(postsPath, 'utf8'),
    readFile(listingPath, 'utf8'),
    readFile(pdfPath),
  ])
  const entry = posts.match(/id: "blog-resilience-over-speed-2026-09-09"[\s\S]*?\n  },\n  {/)?.[0]

  assert.ok(entry, 'expected the new Insight entry')
  assert.match(entry, /slug: "resilience-over-speed"/)
  assert.match(entry, /date: "September 9, 2026"/)
  assert.match(entry, /categories: \["Blogs"\]/)
  assert.match(entry, /href="\/wp-content\/uploads\/2026\/09\/Resilience-over-Speed-Ashoka-12-Sep-2026\.pdf"/)
  assert.match(entry, /target="_blank"/)
  assert.match(entry, /rel="noopener noreferrer"/)
  assert.match(entry, /aria-label="Read Resilience over Speed presentation \(PDF, opens in a new tab\)"/)
  assert.match(listing, /const BLOGS_SLUG_SEQUENCE = \[\s*\/\/ Page 1\s*"resilience-over-speed"/)
  assert.ok(pdf.length > 500_000)
  assert.equal(pdf.subarray(0, 5).toString('ascii'), '%PDF-')
})
