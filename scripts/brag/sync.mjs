import path from 'node:path'

import {
  GENERATED_DIR,
  PRIVATE_LOCAL_FILE,
  buildGeneratedReport,
  buildPrivateLocalFileContent,
  buildSummariesFromRecords,
  ensureDirectory,
  loadCaptureRecords,
  relativeToRoot,
  writeFile,
} from './lib.mjs'

const { console } = globalThis

const REPORT_FILE = path.join(GENERATED_DIR, 'BRAG_SYNC_REPORT.md')

const records = await loadCaptureRecords()
const entries = records.map((record) => record.entry)
const summaries = buildSummariesFromRecords(records)

await ensureDirectory(GENERATED_DIR)

const privateLocalFile = buildPrivateLocalFileContent(entries, summaries)
await writeFile(PRIVATE_LOCAL_FILE, privateLocalFile)

const report = buildGeneratedReport({ records, summaries })
await writeFile(REPORT_FILE, report)

console.log('Brag sync completed.')
console.log(`- Captures processed: ${records.length}`)
console.log(`- Private data module: ${relativeToRoot(PRIVATE_LOCAL_FILE)}`)
console.log(`- Report: ${relativeToRoot(REPORT_FILE)}`)

if (records.length === 0) {
  console.log('No capture files found. Add notes in docs/brag/captures and run again.')
}
