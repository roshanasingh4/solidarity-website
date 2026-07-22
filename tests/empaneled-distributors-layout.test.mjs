import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const pagePath = new URL('../src/pages/EmpaneledDistributorsPage.tsx', import.meta.url)
const stylesPath = new URL('../src/pages/EmpaneledDistributorsPage.css', import.meta.url)

test('APRN and contact numbers stay on one line', async () => {
  const [page, styles] = await Promise.all([
    readFile(pagePath, 'utf8'),
    readFile(stylesPath, 'utf8'),
  ])

  const nowrapCells = page.match(/className="distributors__cell--nowrap"/g) ?? []

  assert.equal(nowrapCells.length, 2)
  assert.match(
    styles,
    /\.distributors__table \.distributors__cell--nowrap\s*{[^}]*white-space:\s*nowrap;[^}]*overflow-wrap:\s*normal;/s,
  )
})

test('table headings only wrap between words', async () => {
  const styles = await readFile(stylesPath, 'utf8')

  assert.match(
    styles,
    /\.distributors__table thead th\s*{[^}]*overflow-wrap:\s*normal;[^}]*word-break:\s*normal;/s,
  )
})
