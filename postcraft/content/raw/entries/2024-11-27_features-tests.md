# New features can be their own tests

*Something to go in my #:um methodology, as and when I can state it a little more formally*

I have the common tendency to rush ahead building the fun new shiny interesting bits, and neglecting the existing *working code*. It's kind-of axiomatic in dev that you need tests. Coincidentally, this morning I saw reference to a book [A Philosophy of Software Design](https://www.amazon.com/dp/1732102201?ref=blog.pragmaticengineer.com) (John Ousterhout, 2018) which apparently downplays tests in favour of comments. To which I'll give a resounding **_wtf?!_**. I've lost the link of a blog post which the not-much-testing aspect more plainly, but Gergely Orosz's [A Philosophy of Software Design: My Take (and a Book Review)](https://blog.pragmaticengineer.com/a-philosophy-of-software-design-review/) answer to mucho-comments rings true.

### Regarding comments -

For sure comments are must have, *at the module/class/method levels*. Document the API right next to its code, use a tool to extract & publish the formal bits, pad with friendlier text at a different layer. *Some* inline comments are desirable, but only when operation isn't immediately evident from the code. This is often the case when lesser-known libs are used, or when an unusual idiom is called into play. I use inline comments a lot, but almost always there with be a `// TODO : ...` nearby.

To use the lingo of men with greyer beards than mine, lots of inline comments are a *Bad Smell*. A strong hint that refactoring is needed. Pull that stuff out into its own functional block, give it a meaningful name.  

### Back to tests -

**Impatience is more motivational than Best Practices**.

I guess this is an instance of a general tendency in human cognition : the **more visceral** an experience is, the **more attention** it will receive.   

Acknowledge that, find a workaround if its called for. As in this case.

## Scenario

I have wasted lots over the past couple weeks having to backtrack a long way due to *more haste...* Today I decided to bite the bullet and improve my testing. I'd set up [Jasmine](https://jasmine.github.io) right at the start of the project, ready to support both unit and integration tests. Today I got [nyc](https://github.com/istanbuljs/nyc) (the CLI of [Istanbul](https://istanbul.js.org/)) working after a fashion from `npm`. This told me what I already knew - my test coverage was ballpark 1%. Not as terrible as it sounds, because I was running the #:postcraft #:transmission most days to publish this blog, and that exercised lots of the code. *Errm,* and frequently it didn't work.

But here's the thing. Aside from the #:transmissions project's core engine bits, the application functionality is strongly decomposed. To develop most new features/applications, I start by making a fairly minimal runner for that particular processor. For example, one that is still in a somewhat hacky state is a thing to restructure a message expressed in JSON structure (as preparation for rending in markdown of Claude data export). To get this working I rigged up a little thing where I gave it a small sample JSON file (Claude's stuff is huge), saving the output to visually check.    

I'd got a bunch of these. Most with the word `test` in their name - subtle hint!

So earlier I did a fresh s/repopack/[repomix](https://github.com/yamadashy/repomix) of my codebase, gave this to Claude as project knowledge (I reuse the same project, system prompt stays the same I just update the knowledge, start new chat sessions). Spent 15 mins on a prompt. After a further 30 mins maybe (6 artifact revisions needed), I had a functioning Jasmine test spec that will run through each `src/applications/test_*` dir, pick up a tiny JSON config file and run the application.

In the space of an hour I'd effectively upped my test coverage to something like 50%.

I still need to do a bit of work on the flow & reporting, right now some of the mini-apps do break with exceptions and the runner doesn't notice.

But essentially these things can make true integration tests, because the test is totally about a (mini) application setup, without any real artificiality coming in from the test framework.

So these, as running code, can be a single source of truth on how things work (once they do...). Docs & RDF/OWL descriptions will be generate from there.  
