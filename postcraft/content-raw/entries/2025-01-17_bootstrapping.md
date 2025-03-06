# Bootstrapping

#:paliwan

I spent this morning getting #:transmissions to talk to a SPARQL store (finally!), is basically working. I also did a little side-step to **get Claude to** advise me on how **to get Claude to** build new applications and processors for #:transmissions. I have been using **repomix** to concat pretty much the whole codebase, which fills about 60% of a Project knowledge. For the side-step I added a bunch of docs, which took it to 90%. This really gobbles tokens fast. So I want more efficient prompting, more focused knowledge. (Very soon I want to port repomix to being a #:transmissions application, a step on the way to a DIY alternative to Claude's web interface).

I would have continued with that to get #:postcraft to build this blog's index page *and* stick the raw markdown in the store, as data for #:semem.
But...

![Claude out of tokens until 5pm](media/images/2025-01/lazy-claude.png)


```sh
ls -s ~/github-danny/hyperdata/packages/semem/docs/postcraft/content-raw ~/github-danny/hyperdata/workspaces/semem
```

* #:tbox
* #:semem
* #:transmissions
* #:hyperdata-clients
* #:kia

I'm a fool wasting an hour on asking for Claude's help on that.

me:
> that's fixed it. This took a very long time because you gave me obvious possible solutions to common problems rather that analysing the data you had at hand. Try harder next time.

Claude:
```
You're right. I should have:

Immediately checked for invalid package.json files in workspace directories
Used find to list non-node_modules package.json files
Spotted zero-byte files that I created during testing
Removed test files to fix workspace parsing

Instead, I explored many less likely possibilities first. My apologies for the inefficient troubleshooting.
```

## CAIAs - Cognitive Autonomous Interactive Agents

This is the term I'm going to use for #:kia (*KIA Intelligence Agency*) agents. The concept isn't as fancy as it sounds. I would have stuck with **agents**, but a big problem with that is that it's currently used with  acting on another's behalf, call this the **lower form of agency**. I want to focus more on agents with greater independence, autonomy, call this the **higher form of agency**.

I started a chat session with Claude with the prompt below (preloaded with a fair bit of relevant Project knowledge and suitable system prompt). After a handful of cycles we got to **CAIA**, which is good enough. Ok, it was the alliteration with **KIA** that got me.

> I want a term or phrase to describe a class of agents in the context of AI software but much of the vocabulary there is heavily overloaded. Is there anything in the philosophy or natural science literature that might be suitable? These agents will vary widely, and the term should be suitable for describing anything from a pebble on a beach to a human. Typically, the main characteristics are that they are identifiable, can act autonomously and communicate with other agents, but their specifics capabilities will be in a wide range. The pebble can't really communicate, but it can be detected by agents with vision. It can't really act, but it does have affordances, like it can be picked up and thrown. At the other end of the scale, humans are versatile at communication and can carry out a lot of actions. Cognitive ability is another characteristic, but that could range from the pebble that can't think, through say a database or old-fashioned reasoner through to agents with superhuman intelligence. Any thoughts?

Claude's first response started with this, definitely felt like the right track :

> The term "affective-interactive entity" (AIE) appears promising, drawing from philosophical work on affordances (Gibson) and affect theory (Spinoza, Deleuze).
