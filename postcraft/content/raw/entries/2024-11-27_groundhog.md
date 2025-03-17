# Groundhog

*I want to avoid those days.*

I really want to get on with new code while the plan details are still in my head. But I'd better do a little to solidify #:transmissions. Started as below. Very quickly semi-distracted.

For #:postcraft docs, I want to get past the *build-everything* setup I've got currently. I want the system to watch for fs changes and update in near real time.

I have an approach I think will work. It's something Claude should be good at building, but I need to check for refactorings that would be useful to do first.

The two main components are general-purpose, but the #:postcraft docs  :

1. #:transmissions running as a daemon (quasi-micro) service with a HTTP API
2. a #:transmission running as a client that will post job descriptions to the server

*Remember requirements for #:kia - this should be able to act as an agent.*

## Service

I've had success with running node services under pm2, but I can start and stop things manually for now.

It might be useful to use the (unsafe) system call processor I started for service runtime updating.

## Client

A big requirement here is a clear description of the description - for this I need to clarify the #:transmissions system structure.

The #:postcraft use case is a nice one though. To watch for fs changes it'll need to operate as a local service, ie. pretty much the same as the server component. But I can start with a very much reduced form.

a transmissions service is running continually.

It watches for filesystem changes in a given directory

---

#:ops. While building up some tests I hit Claude's message limit. Ok, for 7pm (it's now 3:15pm) :

```ho
Can you please create a ho doc, as well as step-by-step instructions on how to create a test application, together with a set of files that can act as a template, following the style of test_fs-rw . Please give me complete individual artifacts for each of these
```

---

## Solidify...

1. test coverage
2. docs
3. GitHub CI/CD
3. refactoring

## 1. Test Coverage

I **really** need proper coverage.

Ok, now nyc is mostly working : `http://localhost/GITHUB-DANNY/transmissions/spec/coverage/lcov-report/`

## 2. Docs

### jsdocs

Ew. I want to customise quite a lot, come back to this later.

### #:postcraft

## 3. GitHub CI/CD

I have looked into it before...completely forgotten.

## 4. Refactoring

I sketched out a plan last week, need to revisit.

## 5. Tests

I need some integration tests that start with CLI calls.

### CLI Core Tests

Did I make a `ConditionTest` processor? Compare the `message` with a pattern, match/no match for test result.

Hmm.

```prompt
I would like an integration test runner `tests/integration/test_apps.spec.js` in a similar form to `tests/integration/fs-rw.spec.js` that will do the following :

* scan for directories that match `src/applications/test_*`, eg. `src/applications/test_fs-rw`
then for each of these :
* set up test data as necessary in `src/applications/*/data/input`, eg. `src/applications/test_fs-rw/data/input/input-01.md`
* run them : eg. `./trans test_fs-rw`
* compare the output message with what is expected, which (if necessary) will appear in a file eg. `src/applications/test_fs-rw/data/output/required-01.md`

Provision should be included to support trying different command-line arguments, so eg. an input message may be given via a string or filename, and/or a target (where a `manifest.ttl` and/or modules may be found), eg :
` ./trans ../trans-apps/applications/test_module-load -m '{"first":"one","second":"two"}'`

Please create the necessary code as complete artifacts.
```

Yay! That worked a treat (by the 6th cycle).

* `(:DatasetReader :FileWriter)`
*
### FS Remote App Test

```sh
./trans ../trans-apps/applications/test_module-load -m '{"first":"one","second":"two"}'
```
