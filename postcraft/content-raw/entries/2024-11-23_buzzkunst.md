# Buzzkunst

*The first CD I have tried playing with office computer. Mad winds last night took one tree onto a power line and others on nearby roads, Mozzanella was well blocked. Power now back, still no interwebs. Italian radio music got tired after a while. Remembered I've got loads of CDs.)*

I think I've finally sorted out the module thing. Bloody paths. So with :
```sh
./trans ../trans-apps/applications/test_module-load -m '{"first":"one","second":"two"}'
```

The *application* is loaded from over there. It uses modules from `/home/danny/github-danny/transmissions/src/processors` and one from `/home/danny/github-danny/trans-apps/applications/test_module-load/processors` that isn't mentioned in the 'local' JS at all, is dynamically loaded from the place of the application.

This bit is as much about decrufting the `transmissions` repo as anything. The next bit is where it'll star getting fun. Working in a similar fashion, the processor modules can be loaded from *anywhere*. They are identified with URIs in the transmission. The most popular form of URI is the URL. Do a HTTP GET, matey! *(microservices proximal)*.

But I really should remember to pace how I do things. I did get some way into defining multiple transmissions at the same time. The composability is key to where I want to go with autonomous agents.

I need to go serious on the tests. There's core refactoring to do, but to save wasting time I should take it methodically.

While going around in circles on this part I stumbled on what looks like a nice way of doing the GETable bits - **Spin** #:todo:link. Some WASM-based thingy.

I also need to do my own version of s/repopack/repomix

I also need to make the #:semem thing.

Most of all I need to dive back to #:farelo so I'm managing my time most effectively.

Which needs a bit of work on #:ns.

But **This is Fine.**. All according to plan. (#:todo:link John Finnemore 'Plans' sketch). Claude is already carrying a lot of my load, as I start being able to use my own bits instead, the net *volume* of work for me should descend rapidly.

Shit. Still some breakage around my paths stuff. An extra hassle being that my publish script for #:postcraft, 'p', seems to have dropped off my PATH.

Fuckity fuck. The `manifest.ttl` bit seems to have dropped out. Before I've even documented how it's meant to (did) work.

**target** isn't being resolved properly. Grr. Bloody path stuff again. Bloody fool dannys again for not having tests in place to catch that sooner.

I remembered to run `backup.sh` so at least this stuff is backed up to a second local drive.
