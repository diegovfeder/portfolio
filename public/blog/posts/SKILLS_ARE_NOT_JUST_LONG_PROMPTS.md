# Skills Are Not Just Long Prompts

*A good skill does not make an agent magically smarter. It makes the agent more reliable inside a clearly bounded job.*

Over the last few months, more engineers have started exploring prompt engineering, code agents, and developer automations. In that process, one idea keeps showing up: skills.

Many people look at the concept and arrive at the same conclusion: a skill is basically a better organized prompt.

That is understandable, but incomplete.

The more useful way to think about it is this:

a skill is not only an instruction. A skill is a packaged capability.

The point is not to make the model "better" in the abstract. The point is to make it more consistent, more reusable, and more useful inside a specific context.

## The Most Common Mistake

The most common mistake is writing a skill like a philosophical manifesto about good engineering.

That is how you end up with the usual baroque monster:

- too generic
- too abstract
- too long
- full of "always do the best thing"
- empty of real criteria

This fails for a simple reason: agents do better when they get clear scope, explicit workflow, and checkable standards.

A skill without criteria quickly turns into superstition written in Markdown.

## What a Skill Should Actually Contain

When I think about a useful engineering skill, I like to break it into four parts.

## 1. Context

Where should this skill operate?

Examples:

- a Next.js TypeScript app
- a Node or Nest backend
- a codebase with its own design system
- a monorepo with clear boundaries
- git diff review
- PR description writing
- SQL migration analysis

Without context, the agent fills the blanks with imagination. That is great for science fiction. For code review, not so much.

## 2. Workflow

The skill should say how to think and in what order to analyze the problem.

For example:

1. Understand the goal of the change.
2. Identify the affected areas.
3. Review functional risks.
4. Review tests.
5. Check consistency with internal patterns.
6. Classify severity.
7. Return the result in a usable format.

That changes the quality of the result immediately. The agent stops improvising and starts following rails.

## 3. Quality Criteria

The skill should define what actually counts as a problem.

Examples:

- blocker
- warning
- nit
- regression risk
- acceptable debt
- things that are not worth commenting on

This part matters a lot. Mature teams are not the teams that comment on everything. They are the teams that know what deserves attention.

## 4. Output Format

If the final answer does not help the workflow, the skill is still poorly designed.

For a code review skill, for example, I would rather see:

- risk summary
- critical findings
- important findings
- minor suggestions
- missing tests
- final recommendation

That is much more useful than dumping twenty-seven disconnected observations on someone late on a Friday.

## A Skill Does Not Replace a Spec

One practical pattern I trust is this:

before writing the skill, write the skill spec.

That step is badly underrated.

Instead of asking directly:

"Create a code review skill for my project."

It is usually better to ask for something like:

"Analyze this repository, identify its stack, conventions, folder structure, review standards, and quality bar, then write a spec for a code review skill that fits this environment."

After that:

1. Review the spec.
2. Correct exaggerations and gaps.
3. Add company-specific rules.
4. Only then turn it into a reusable skill.

This works because it forces the workflow to come from the actual codebase instead of from generic best-practice theater.

## Prompt Engineering Still Matters, But It Changes Shape

When people say they want to study prompt engineering, they usually mean "I want to write better prompts."

In the context of skills, prompt engineering becomes something else:

- context design
- workflow design
- criteria design
- output design
- evaluation design

That is an important jump.

You move from "how do I persuade the model to answer well?" to "how do I package a reusable capability that fails less often?"

For software engineering, that second question is much more valuable.

## How I Would Study This

If I wanted a lean learning path, I would do three things.

## 1. Read Official Documentation First

The official material is still the best place to understand how each tool thinks about skills, instructions, and reusable agent workflows.

That matters because different ecosystems package the idea differently, even when they converge on the same broader pattern.

## 2. Look for Real Engineering Examples

Theory helps. Examples help more.

The useful question is not "what is a skill?" It is "how is this actually being used to make engineering work more reliable?"

## 3. Follow People Who Experiment in Public

Some of the best insight comes from people who test these workflows repeatedly and write about what failed, what generalized, and what turned out to be hype.

That kind of practical writing is useful because it turns abstract tooling into operational judgment.

## How I Would Use Skills Day to Day

I would not start with a generic skill like:

"Review any code using best practices."

That is too broad. Excessive breadth usually produces elegant mediocrity.

I would start with narrower skills that map to real engineering responsibilities.

## Review Diff in Next.js

Focus on:

- server and client boundaries
- accessibility
- loading and error states
- unnecessary re-renders
- consistency with the design system
- missing tests

## Review Backend in Node or Nest

Focus on:

- API contracts
- error handling
- input validation
- idempotency
- basic performance concerns
- observability

## Review Database Migrations

Focus on:

- lock risk
- backward compatibility
- production impact
- indexes
- rollout plan

## Write PR Summaries

Focus on:

- context of the change
- problem being solved
- chosen approach
- risk
- test plan
- screenshots or supporting evidence

## Plan Tests

Focus on:

- happy paths
- edge cases
- regression scenarios
- smoke tests
- coverage gaps

This kind of decomposition works better because it pulls the skill closer to a real responsibility. It is the old engineering trick: separate what was turning into mush.

## What Makes a Code Review Skill Actually Good

In my view, a code review skill becomes genuinely useful when it can do three things well.

It understands the goal of the change.

Without that, the review becomes ornamental.

It knows what to ignore.

That is maturity. Not every detail deserves a comment.

It prioritizes by risk.

A good reviewer does not only point at issues. They help distinguish:

- what can break the change
- what can degrade behavior
- what is only a refinement

If I had to define a standard output for a code review skill, it would look something like this:

## Summary

A short read of the change and the overall risk level.

## Critical Findings

Problems that justify requesting changes.

## Important Findings

Relevant issues that matter, but are not necessarily blockers.

## Minor Suggestions

Local improvements with lower urgency.

## Missing Tests

Scenarios that still need coverage.

## Final Recommendation

Approve | Approve with notes | Request changes

That already gets the agent closer to a senior reviewer than to a compulsive commenter.

## The Part Many People Ignore: Evaluating the Skill

This is one of the most important parts.

You should not consider a skill good because it reads well.

You should consider it good because it:

- finds real problems
- reduces noise
- improves consistency
- helps the team more than it slows the team down

A simple way to test that is to build a small set of cases:

- good diffs
- bad diffs
- ambiguous diffs
- small changes
- risky changes

Then compare:

- did the skill catch the real risks?
- did it miss something important?
- did it comment on too much nonsense?
- did the output help the workflow?

That is the step that turns a skill into a tool instead of an amulet.

## Closing

Learning to write skills is useful because it forces you to think like a systems engineer, not only like an AI user.

You have to turn tacit knowledge into:

- explicit context
- repeatable process
- verifiable criteria
- useful output
- continuous improvement

At that point, the conversation stops being only about prompt engineering.

It starts touching workflow architecture, software quality, and how teams create leverage.

That is why I like this area.

From the outside it can look like "just prompting." Inside, it reaches into process design, quality standards, and how engineering judgment gets packaged for reuse.

That is where it starts becoming genuinely valuable.
