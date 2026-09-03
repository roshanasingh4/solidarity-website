import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const navbarPath = new URL('../src/components/Navbar.tsx', import.meta.url)
const pdfPath = new URL(
  '../public/wp-content/uploads/2026/09/Annexure B- AUG 26-NEW FORMAT-PMS.pdf',
  import.meta.url,
)

test('PMS investor complaints links to the August 2026 PDF', async () => {
  const navbar = await readFile(navbarPath, 'utf8')

  assert.match(
    navbar,
    /label: 'Investor complaints', href: '\/wp-content\/uploads\/2026\/09\/Annexure B- AUG 26-NEW FORMAT-PMS\.pdf', external: true/,
  )
})

test('the August PMS complaints PDF includes core accessibility structure', async () => {
  const pdf = await readFile(pdfPath)
  const source = pdf.toString('latin1')

  assert.ok(pdf.length > 250_000)
  assert.equal(pdf.subarray(0, 8).toString('ascii'), '%PDF-1.7')
  assert.match(source, /\/StructTreeRoot/)
  assert.match(source, /\/Marked true/)
  assert.match(source, /\/S \/H1/)
  assert.match(source, /\/S \/H2/)
  assert.match(source, /\/Scope \/Column/)
  assert.match(source, /\/Scope \/Row/)
})
