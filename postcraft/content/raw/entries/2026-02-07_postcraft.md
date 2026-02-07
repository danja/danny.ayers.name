# Postcraft Update

This is a test.

Rather wonderfully both Codex and Claude have a decent grip on how [Transmissions](https://github.com/danja/transmissions), my pipeliney thing, works.
I'm not entirely sure what's being used under the hood, but I did get **Claude** to create a **Skill** for creating *Transmissions* (what I call my pipelines).
Claude was then able to build me a feed aggregator using Transmissions as the engine.

I've been using Transmissions-based apps for publishing my blog content for a while now. The source content I write as markdown files in my local filesystem. One app pushes this content off to a remote SPARQL store (Fuseki on my server), another app renders the content as HTML, yet another creates the index pages.

This works ok but an outstanding issue was that each time I ran these apps, every single blog post was processed again. So I just got Codex to modify the pipelines to keep a note of changes. It chose to use a local JSON file for keeping the cache info, which is fine by me. Everything looks like it still functions ok. My tests are a bit haphazard, the best test is to run the thing. For which I need a new blog post. So,

This is a test.
