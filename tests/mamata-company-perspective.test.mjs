import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import test from 'node:test'

const article = await readFile(new URL('../src/data/mamataMachineryArticle.ts', import.meta.url), 'utf8')
const posts = await readFile(new URL('../src/data/posts.tsx', import.meta.url), 'utf8')
const listing = await readFile(new URL('../src/pages/PerspectivesListingPage.tsx', import.meta.url), 'utf8')

test('Mamata is a full Company Perspective rather than a PDF-only post', () => {
  assert.match(posts, /slug: "investment-thesis-on-mamata-machinery"/)
  assert.match(posts, /categories: \["Company Perspective"\]/)
  assert.match(article, /<h2>Summary<\/h2>/)
  assert.match(article, /<h2>Appendix<\/h2>/)
  assert.match(article, /<h2>Disclaimer<\/h2>/)
  assert.ok(article.length > 40_000, 'expected the full substantive article text')
})

test('Mamata appears first in Select Company Perspectives', () => {
  const companySequence = listing.slice(listing.indexOf('const COMPANY_PERSPECTIVE_SLUG_SEQUENCE'))
  assert.ok(
    companySequence.indexOf('investment-thesis-on-mamata-machinery') <
      companySequence.indexOf('investment-thesis-on-vasa-denticity'),
  )
})

test('the downloadable Mamata PDF is present and non-empty', async () => {
  const pdf = new URL(
    '../public/wp-content/uploads/2026/08/Mamata-Machinery-Investment-Thesis-31-August-2026.pdf',
    import.meta.url,
  )
  assert.ok((await stat(pdf)).size > 100_000)
})
