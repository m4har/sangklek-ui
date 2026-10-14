// Screenshot the example app for README + docs. Run: node scripts/shots.mjs
import { chromium } from "playwright"
import { mkdirSync } from "node:fs"

const base = process.env.E2E_BASE_URL || "http://127.0.0.1:4173"
const out = new URL("../docs/screenshots/", import.meta.url).pathname
mkdirSync(out, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

const shots = [
  ["", "landing"],
  ["/docs", "components"],
  ["/cms", "console"],
  ["/contact", "contact"],
]

for (const [path, name] of shots) {
  await page.goto(base + path, { waitUntil: "networkidle" })
  await page.waitForTimeout(600)
  await page.screenshot({ path: `${out}${name}.png`, fullPage: true })
  console.log(`${name}.png`)
}

// Rule rail with hover readout: cursor parked on the right rail
await page.goto(base + "/", { waitUntil: "networkidle" })
await page.mouse.move(1410, 500)
await page.waitForTimeout(400)
await page.screenshot({ path: `${out}rule-rail.png` })
console.log("rule-rail.png")

await browser.close()
