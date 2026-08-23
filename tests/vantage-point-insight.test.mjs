import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import test from 'node:test'

const postsPath = new URL('../src/data/posts.tsx', import.meta.url)
const listingPath = new URL('../src/pages/PerspectivesListingPage.tsx', import.meta.url)
const sidebarPath = new URL('../src/components/PerspectivesSidebar.tsx', import.meta.url)
const pdfPath = new URL(
  '../public/wp-content/uploads/2026/08/Brief-update-from-our-vantage-point-20-Aug-2026.pdf',
  import.meta.url,
)

test('the August vantage-point Insight is listed first', async () => {
  const [posts, listing, sidebar] = await Promise.all([
    readFile(postsPath, 'utf8'),
    readFile(listingPath, 'utf8'),
    readFile(sidebarPath, 'utf8'),
  ])

  assert.match(posts, /slug: "brief-update-from-our-vantage-point-20-aug-2026"/)
  assert.match(posts, /title: "Brief update from our vantage point - 20 Aug 2026"/)
  assert.match(
    listing,
    /const BLOGS_SLUG_SEQUENCE = \[\s*\/\/ Page 1\s*"brief-update-from-our-vantage-point-20-aug-2026"/,
  )
  assert.match(
    sidebar,
    /const DEFAULT_LATEST_SLUGS = \[\s*'brief-update-from-our-vantage-point-20-aug-2026'/,
  )
})

test('the Insight links accessibly to the published PDF in a new tab', async () => {
  const posts = await readFile(postsPath, 'utf8')
  const postBlock = posts.match(
    /id: "blog-vantage-point-2026-08-20"[\s\S]*?\n  },\n  {/,
  )?.[0]

  await access(pdfPath)
  assert.ok(postBlock)
  assert.match(
    postBlock,
    /href="\/wp-content\/uploads\/2026\/08\/Brief-update-from-our-vantage-point-20-Aug-2026\.pdf"/,
  )
  assert.match(postBlock, /target="_blank"/)
  assert.match(postBlock, /rel="noopener noreferrer"/)
  assert.match(postBlock, /aria-label="Brief update from our vantage point - 20 August 2026 \(PDF, opens in a new tab\)"/)
  assert.match(postBlock, />\s*Brief update from our vantage point - 20 August 2026 \(PDF\)\s*<\/a>/)
  assert.doesNotMatch(postBlock, />\s*here\s*<\/a>/i)
})

test('the linked asset is a non-empty PDF document', async () => {
  const pdf = await readFile(pdfPath)

  assert.ok(pdf.length > 300_000)
  assert.equal(pdf.subarray(0, 5).toString('ascii'), '%PDF-')
})
