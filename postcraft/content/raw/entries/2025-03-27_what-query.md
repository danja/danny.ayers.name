# What Query..?

So my blog is now back live-ish. The *-ish* comes from the fact it's messing up the order of posts.

## The Secret to Comedy

Material is being passed to and fro between #:transmissions and a SPARQL store (in a #:tbox Docker container, right now running locally) and when I threw the full 100s of entries at it, initially this machine was segfaulting. Ok, my best guess is memory is getting eaten too fast for whatever garbage collection is running around here.

But so far I haven't really considered timing (or much of concurrency). The SPARQL store calls, and many I will be wanting to do soon are over HTTP, some throttling facility is needed.
Fortunately this was pretty easy to set up in node/#transmissions.

I added a method to an existing `SysUtils` class:
```sh
class SysUtils {
...
  static sleep(ms=100) {
      return new Promise((resolve) => {
          setTimeout(resolve, ms)
      })
  }
}
export default SysUtils
```
Then in #:transmissions all I had to do was to get the value from the config of whichever `Processor` might need slowing, then call the above.
```sh
const delay = super.getProperty(ns.trn.delay, '100') // 100mS is default if unspecified elsewhere
...
await SysUtils.sleep(delay)
```
It actually worked!
Well, to the extent that the thing isn't crash & burning any more.

Hmm. This is the kind of thing that might be needed in a bunch of different processors. Performance is way down the list of considerations for #:transmissions *at the moment*, so I could stick the above in in the parent `Processor` class. But hmm...

I just put it in `src/processors/flow/ForEach.js`, but inside the loop. Nah, wrong place.

Subclass of `Processor` called `SlowableProcessor`, put delay in the `preProcess(message)` call on its way up to the one in `Processor`. Make things like `SPARQLUpdate` a child of that. Yup.
I'm wary of big inheritance trees (Java in a past life), which is why there aren't any here, dependency injection instead in most places. Grandparents is ok.
