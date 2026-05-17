# Codebase Forensics Reports

Timestamped repository forensics snapshots for reuse across sessions.

## Reports

- [2026-03-12 — Codebase Forensics Baseline](./2026-03-12-codebase-forensics.md)
- [2026-03-13 — Codebase Forensics Delta](./2026-03-13-codebase-forensics-delta.md)

## Usage

- Read this index first, then open the latest report before starting a new pass.
- Default workflow is delta-first: compare current repo state against the latest indexed snapshot and record only net-new findings, corrected stale findings, removed assumptions, and new unknowns.
- Use `docs/prompts/CODEBASE_FORENSICS_PROMPT.md` to generate the next delta report.
