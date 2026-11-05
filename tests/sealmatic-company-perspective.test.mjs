import assert from 'node:assert/strict'
import { readFile, stat } from 'node:fs/promises'
import test from 'node:test'

const article = await readFile(new URL('../src/data/sealmaticIndiaArticle.ts', import.meta.url), 'utf8')
const posts = await readFile(new URL('../src/data/posts.tsx', import.meta.url), 'utf8')
const listing = await readFile(new URL('../src/pages/PerspectivesListingPage.tsx', import.meta.url), 'utf8')

test('Sealmatic is a full Company Perspective with its downloadable source PDF', async () => {
  assert.match(posts, /slug: "investment-thesis-on-sealmatic-india"/)
  assert.match(posts, /title: "Investment Thesis on Sealmatic India"/)
  assert.match(article, /<h2>Summary<\/h2>/)
  assert.match(article, /<h2>Growth prospects<\/h2>/)
  assert.match(article, /<h2>Disclaimer<\/h2>/)
  assert.ok(article.length > 12_000, 'expected the full substantive article text')

  const pdf = new URL(
    '../public/wp-content/uploads/2026/11/Sealmatic-India-Investment-Note-05-November-2026.pdf',
    import.meta.url,
  )
  assert.ok((await stat(pdf)).size > 400_000)
})

test('Sealmatic appears first in Select Company Perspectives', () => {
  const companySequence = listing.slice(listing.indexOf('const COMPANY_PERSPECTIVE_SLUG_SEQUENCE'))
  assert.ok(
    companySequence.indexOf('investment-thesis-on-sealmatic-india') <
      companySequence.indexOf('investment-thesis-on-mamata-machinery'),
  )
})
