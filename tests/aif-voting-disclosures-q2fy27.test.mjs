import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const pagePath = new URL('../src/pages/VotingDisclosuresPage.tsx', import.meta.url)
const pdfPath = new URL(
  '../public/wp-content/uploads/2026/10/Solidarity-Micro-Cap-Emerging-Leader-AIF-Voting-disclosures-Q2FY27.pdf',
  import.meta.url,
)

test('FY 2026-27 voting disclosures link to the Q2 PDF', async () => {
  const page = await readFile(pagePath, 'utf8')

  assert.match(
    page,
    /href="\/wp-content\/uploads\/2026\/10\/Solidarity-Micro-Cap-Emerging-Leader-AIF-Voting-disclosures-Q2FY27\.pdf"/,
  )
  assert.match(page, />\s*Q2FY27\s*<\/a>/)
})

test('the Q2 FY27 voting disclosure PDF retains its accessibility structure', async () => {
  const pdf = await readFile(pdfPath)
  const source = pdf.toString('latin1')

  assert.ok(pdf.length > 500_000)
  assert.equal(pdf.subarray(0, 8).toString('ascii'), '%PDF-1.7')
  assert.match(source, /\/StructTreeRoot/)
  assert.match(source, /\/Marked true/)
  assert.match(source, /\/Lang\(en\)/)
})
