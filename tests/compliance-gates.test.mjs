import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const dataPath = new URL('../src/data/complianceDisclaimers.ts', import.meta.url)
const gatePath = new URL('../src/components/ComplianceGates.tsx', import.meta.url)
const navbarPath = new URL('../src/components/Navbar.tsx', import.meta.url)
const aifProductPagePath = new URL('../src/pages/ProductOfferingAifPage.tsx', import.meta.url)
const stylesPath = new URL('../src/components/ComplianceGates.css', import.meta.url)

test('approved legal copy and versioned acceptance keys are preserved', async () => {
  const data = await readFile(dataPath, 'utf8')

  assert.match(data, /solidarity-site-disclaimer-v1/)
  assert.match(data, /solidarity-aif-disclaimer-v1/)
  assert.match(data, /resident of the United States of America/)
  assert.match(data, /IN\/AIF3\/25-26\/1894/)
  assert.match(data, /past performances are not indicative of future performance/)
  assert.match(data, /I agree; I shall be responsible for my actions/)
})

test('every AIF-labelled navigation destination is protected', async () => {
  const navbar = await readFile(navbarPath, 'utf8')
  const protectedItems = navbar.match(/requiresAifDisclaimer: true/g) ?? []

  assert.equal(protectedItems.length, 5)
  assert.match(navbar, /Product Offering[^\n]+requiresAifDisclaimer: true/)
  assert.match(navbar, /Investor charter[^\n]+requiresAifDisclaimer: true/)
  assert.match(navbar, /Investor complaints[^\n]+requiresAifDisclaimer: true/)
  assert.match(navbar, /Voting disclosures[^\n]+requiresAifDisclaimer: true/)
  assert.match(navbar, /STEWARDSHIP CODE – AIF[^\n]+requiresAifDisclaimer: true/)
})

test('direct internal AIF routes are protected', async () => {
  const data = await readFile(dataPath, 'utf8')

  assert.match(data, /'\/product-offering-2'/)
  assert.match(data, /'\/product\/aif\/voting-disclosures'/)
})

test('AIF product page includes the approved SEBI registration wording', async () => {
  const page = await readFile(aifProductPagePath, 'utf8')

  assert.match(
    page,
    /Solidarity Alternative Investment Trust<\/strong>, a SEBI registered Category III AIF vide SEBI Reg\. No\.: IN\/AIF3\/25-26\/1894 under SEBI \(Alternative Investment Fund\) Regulations, 2012\./,
  )
})

test('dialogs expose required WCAG modal behavior', async () => {
  const [gate, styles] = await Promise.all([
    readFile(gatePath, 'utf8'),
    readFile(stylesPath, 'utf8'),
  ])

  assert.match(gate, /role="dialog"/)
  assert.match(gate, /aria-modal="true"/)
  assert.match(gate, /aria-labelledby=/)
  assert.match(gate, /aria-describedby=/)
  assert.match(gate, /event\.key === 'Escape'/)
  assert.match(gate, /event\.key !== 'Tab'/)
  assert.match(gate, /setAttribute\('inert', ''\)/)
  assert.match(gate, /navigate-accessibility-widget-root/)
  assert.match(gate, /new MutationObserver\(isolateAccessibilityWidget\)/)
  assert.match(gate, /widget\.setAttribute\('aria-hidden', 'true'\)/)
  assert.doesNotMatch(gate, /type="checkbox"/)
  assert.doesNotMatch(gate, /disabled={!agreed}/)
  assert.match(gate, /<button ref={continueButtonRef} type="submit">Agree &amp; Continue<\/button>/)
  assert.match(gate, /compliance-gate__acknowledgement/)
  assert.match(gate, /key="site"/)
  assert.match(gate, /key="aif"/)
  assert.match(gate, /replace\(\/\\\/\+\$\/, ''\)/)
  assert.match(gate, /addEventListener\('auxclick', handleAifLink, true\)/)
  assert.match(gate, /addEventListener\('contextmenu', handleAifLink, true\)/)
  assert.match(gate, /event\.type === 'contextmenu'/)
  assert.match(gate, /event\.button === 1/)
  assert.match(gate, /event\.metaKey/)
  assert.match(gate, /event\.ctrlKey/)
  assert.match(gate, /pendingDestination\.current = null\s+setAifRequested\(false\)/)
  assert.match(styles, /:focus-visible/)
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/)
  assert.match(styles, /min-height: 48px/)
  assert.match(styles, /\.compliance-gate__copy\s*\{[^}]*text-align: justify;/s)
  assert.match(styles, /@media \(max-width: 520px\)[\s\S]*\.compliance-gate__copy\s*\{[^}]*text-align: left;/)
  assert.match(styles, /body\.compliance-gate-open #navigate-accessibility-widget-root/)
  assert.match(styles, /display: none !important/)
})
