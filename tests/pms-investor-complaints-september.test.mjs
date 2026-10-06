import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const navbarPath = new URL('../src/components/Navbar.tsx', import.meta.url)
const pdfPath = new URL(
  '../public/wp-content/uploads/2026/10/Annexure B- SEP 26-NEW FORMAT-PMS.pdf',
  import.meta.url,
)

test('PMS investor complaints links to the September 2026 PDF', async () => {
  const navbar = await readFile(navbarPath, 'utf8')

  assert.match(
    navbar,
    /label: 'Investor complaints', href: '\/wp-content\/uploads\/2026\/10\/Annexure B- SEP 26-NEW FORMAT-PMS\.pdf', external: true/,
  )
})

test('the September PMS complaints PDF retains its accessibility structure', async () => {
  const pdf = await readFile(pdfPath)
  const source = pdf.toString('latin1')

  assert.ok(pdf.length > 250_000)
  assert.equal(pdf.subarray(0, 8).toString('ascii'), '%PDF-1.7')
  assert.match(source, /\/StructTreeRoot/)
  assert.match(source, /\/Marked true/)
  assert.match(source, /\/Lang\(en\)/)
})
