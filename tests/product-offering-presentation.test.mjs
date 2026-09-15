import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const pagePath = new URL('../src/pages/ProductOfferingPage.tsx', import.meta.url)
const pdfPath = new URL(
  '../public/wp-content/uploads/2026/09/Introduction-to-Solidarity-8-Sep-2026.pdf',
  import.meta.url,
)

test('Product Offering links accessibly to the approved September presentation', async () => {
  const [page, pdf] = await Promise.all([
    readFile(pagePath, 'utf8'),
    readFile(pdfPath),
  ])

  assert.match(
    page,
    /href="\/wp-content\/uploads\/2026\/09\/Introduction-to-Solidarity-8-Sep-2026\.pdf"/,
  )
  assert.match(page, /target="_blank"/)
  assert.match(page, /rel="noopener noreferrer"/)
  assert.equal(pdf.subarray(0, 8).toString('ascii'), '%PDF-1.7')
  assert.equal(
    createHash('sha256').update(pdf).digest('hex'),
    'd28296ee02c946861d64a36a9c0cb2e954eff32a9dab194a474186c3e194c3fd',
  )
})
