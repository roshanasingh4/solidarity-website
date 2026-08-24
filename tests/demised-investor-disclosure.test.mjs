import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const navbarPath = new URL('../src/components/Navbar.tsx', import.meta.url)
const navbarStylesPath = new URL('../src/components/Navbar.css', import.meta.url)
const pdfPath = new URL(
  '../public/wp-content/uploads/2026/08/SOP_Centralised_Reporting_Mechanism_for_Demised_Investor.pdf',
  import.meta.url,
)

test('the demised-investor reporting mechanism is linked under Disclosures', async () => {
  const navbar = await readFile(navbarPath, 'utf8')

  assert.match(
    navbar,
    /label: 'Centralised Reporting Mechanism for Demised Investor', href: '\/wp-content\/uploads\/2026\/08\/SOP_Centralised_Reporting_Mechanism_for_Demised_Investor\.pdf', external: true/,
  )
})

test('the demised-investor reporting mechanism is a non-empty PDF document', async () => {
  const pdf = await readFile(pdfPath)

  assert.ok(pdf.length > 1_000_000)
  assert.equal(pdf.subarray(0, 5).toString('ascii'), '%PDF-')
})

test('the expanded mobile menu starts below the fixed header and can scroll', async () => {
  const styles = await readFile(navbarStylesPath, 'utf8')
  const mobileMenuBlock = styles.match(/\.mobile-menu \{[\s\S]*?\n\}/)?.[0]
  const mobileInnerBlock = styles.match(/\.mobile-menu__inner \{[\s\S]*?\n\}/)?.[0]

  assert.ok(mobileMenuBlock)
  assert.match(mobileMenuBlock, /overflow-y: auto;/)
  assert.match(mobileMenuBlock, /justify-content: flex-start;/)
  assert.ok(mobileInnerBlock)
  assert.match(mobileInnerBlock, /padding: calc\(var\(--navbar-height\) \+ 1rem\) 0 2rem;/)
})
