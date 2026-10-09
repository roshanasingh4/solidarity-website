import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const pagePath = new URL('../src/pages/ProductOfferingPage.tsx', import.meta.url)
const pdfPath = new URL(
  '../public/wp-content/uploads/2026/10/Introduction-to-Solidarity-9-Oct-2026.pdf',
  import.meta.url,
)

test('Product Offering links accessibly to the approved October presentation', async () => {
  const [page, pdf] = await Promise.all([
    readFile(pagePath, 'utf8'),
    readFile(pdfPath),
  ])

  assert.match(
    page,
    /href="\/wp-content\/uploads\/2026\/10\/Introduction-to-Solidarity-9-Oct-2026\.pdf"/,
  )
  assert.match(page, /target="_blank"/)
  assert.match(page, /rel="noopener noreferrer"/)
  assert.equal(pdf.subarray(0, 8).toString('ascii'), '%PDF-1.7')
  assert.equal(
    createHash('sha256').update(pdf).digest('hex'),
    '606a03316c48edd6da26a8478c261060d87efd5e265eeb7f1b999ccb03c2cd70',
  )
})
