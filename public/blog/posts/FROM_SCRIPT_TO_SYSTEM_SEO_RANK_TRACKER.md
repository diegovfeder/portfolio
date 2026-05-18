# From Script to System: Making SEO Tracking Trustworthy

*Automation is only half the job. The other half is believing the output when nobody is watching.*

I already had a working SEO rank tracker. It pulled data, updated CSVs, and looked fine in the happy path. But the deeper it became part of weekly decisions, the more fragile it felt. One small logic change could distort history, and debugging edge cases meant hitting live APIs and hoping the same conditions appeared again.

That was the turning point. I stopped treating it like a script and redesigned it as a small system.

## Why a Working Script Still Failed the Test

The original version had a familiar shape: ranking logic, file I/O, and API calls all mixed in the same flow. It worked, but confidence dropped every time I touched it.

The core risks were practical, not theoretical:

- history could become inconsistent across runs
- behavior was hard to verify without real network calls
- subtle parsing issues could silently skew summaries
- changes felt risky because the logic had no protective boundaries

When tracking feeds decisions, "usually correct" is a liability. The pipeline needed to become deterministic, testable, and explicit about missing data.

## The Architecture Shift That Changed Everything

I split the pipeline into a pure core plus thin adapters. Ranking and summary rules moved into reusable modules. Runtime wrappers stayed responsible for orchestration and environment wiring.

The most useful move was dependency injection for I/O: HTTP client, clock, CSV read/write, and config are now provided as dependencies instead of being hardwired. That gave me deterministic tests with fake fetch, fake timestamps, and temp files while keeping production behavior unchanged.

```js
// Core logic receives dependencies, not global side effects.
const result = await runRankTrackingPipeline({
  fetchImpl,
  now: () => fixedIsoTimestamp,
  csvIO,
  env,
});
```

## Before vs After: Reliability in Practice

The refactor kept the CSV contract and CLI behavior stable, but changed the reliability profile:

| Area | Before | After |
| --- | --- | --- |
| Testing | Mostly manual, API-dependent | Unit + mocked integration tests |
| History model | Gaps when keywords were missing | Full per-run snapshots per keyword |
| Timestamps | Mixed formats risk | ISO UTC (`YYYY-MM-DDTHH:mm:ss.sssZ`) |
| Failure handling | External failures could blur state | Non-fatal enrichment + explicit fallbacks |
| Change safety | High fear of regressions | Fast feedback with deterministic tests |

A real bug surfaced during this work: empty numeric fields were interpreted as `0` instead of `null` in summary parsing. That single fix protected KPI accuracy and was exactly the kind of issue the previous setup could hide.

## Closing: Trust Is an Engineering Feature

The biggest win was not cleaner code. It was operational confidence.

Now I can change ranking logic without guessing what broke in history. I can validate edge cases without paying API cost. I can treat time-series output as evidence instead of noisy logs.

A script that works once is useful. A pipeline you can test, trust, and evolve is infrastructure.
