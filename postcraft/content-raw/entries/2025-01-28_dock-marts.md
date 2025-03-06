# Dock Marts

*I got this earworm : [Dr Marten's Boots](https://www.youtube.com/watch?v=bZy7vEWeTFY)*

We were woken by loud weather at 6:50 - deluge, with some clicky hail. Claudio is a bit confused, expect another hour in bed. I have reviewed the #:semem docs I printed yesterday.

## hyperdata

* top-level docs for tech stack, conventions etc

## Postcraft

* need to get #:postcraft running again

New common folder : `[project]/docs/postcraft/content-raw/index/`
* `index.md` - pointing to other docs
* `about.md` - describing core self

## Semem

* plough through #:semem tests
* update docs
* make examples

Q1: Should we add error recovery strategies?
Q2: Would adding error event emission be useful?
Q3: Should we implement request timeout handling?
Q4: Would adding error rate monitoring help?

```prompt
First please read the material in project knowledge labeled SEMEM-DOCS to orient yourself. The issue right now is that most of the unit tests are throwing exceptions in code that isn't directly related to the part that's meant to be tested. This points to systematic errors in the way the tests are structured. Please refactor, pulling out any common code to helpers and isolating the specific targeting of methods. Improve reporting so issues can be better located. Best practice unit tests. Provide all code as complete individual artifacts containing full source code.
```

NEED PROFILING

GITHUB ACTIONS

### Coverage

npm install --save-dev nyc @istanbuljs/nyc-config-babel codecov coverage-badge-creator

NEED A README

what do I put in stack & conventions docs?
