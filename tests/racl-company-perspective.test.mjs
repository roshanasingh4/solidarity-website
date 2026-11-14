import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const posts = await readFile(new URL('../src/data/posts.tsx', import.meta.url), 'utf8')
const listing = await readFile(new URL('../src/pages/PerspectivesListingPage.tsx', import.meta.url), 'utf8')

const raclPostStart = posts.indexOf('slug: "investment-thesis-on-racl-geartech"')
const raclPostEnd = posts.indexOf('\n  {', raclPostStart)
const raclPost = posts.slice(raclPostStart, raclPostEnd)

test('RACL Geartech is categorized only as a Company Perspective', () => {
  assert.ok(raclPostStart >= 0, 'expected the RACL Geartech post')
  assert.match(raclPost, /categories: \["Company Perspective"\]/)
  assert.doesNotMatch(raclPost, /Perspective On Questions From Client Partners/)
  assert.match(raclPost, /path: "\/perspectives\/company-perspective"/)
})

test('RACL Geartech appears only in the Company Perspective sequence', () => {
  const companyStart = listing.indexOf('const COMPANY_PERSPECTIVE_SLUG_SEQUENCE')
  const companyEnd = listing.indexOf('const EQUITY_SLUG_SEQUENCE', companyStart)
  const companySequence = listing.slice(companyStart, companyEnd)
  const clientStart = listing.indexOf('const CLIENT_QUESTIONS_SLUG_SEQUENCE')
  const clientEnd = listing.indexOf('const filteredPosts', clientStart)
  const clientSequence = listing.slice(clientStart, clientEnd)

  assert.match(companySequence, /investment-thesis-on-racl-geartech/)
  assert.doesNotMatch(clientSequence, /investment-thesis-on-racl-geartech/)
})
