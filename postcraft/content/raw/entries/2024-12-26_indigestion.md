# Indigestion

*Despite in being traditional to overeat at this time of year, it's not me but my code that's got tummy ache.*

This blog now has an [Atom Feed](https://danny.ayers.name/atom.xml). I've only done an eyeball check, but it looks ok.

The other night I had a quick stab at adding this. Claude gave me some convincing-looking code, which didn't work. I only had a quick look then, it looked like it might take a while to fix. It turned out to be easy, but only once I'd figured out what my #:postcraft code (from months ago) was doing, which took ages. My bad, I'm not surprised Claude got things wrong, my stuff was well obfuscated.

The immediate issue was in the handling of `manifest.ttl`, the purpose of which in this case was to provide `danny.ayers.name` site-specific information to the `postcraft` #:transmissions application. I was already well aware that a bunch of **refactoring** was needed around the `transmissions.ttl`/`config.ttl`/`manifest.ttl` **separation of concerns**. It turned out to be worse than I thought : the handling of `manifest.ttl` was pretty much **hardcoded** in `src/processors/rdf/ConfigMap.js`. **Ops!**

To get a feed rendering, as a quick workaround I copy & pasted the method that handled the **RDF resource** `t:IndexPage` and tweaked for `t:AtomFeed`.

Not pretty, but it'll do for now. That was a useful exercise, it added another flag to a specific group of #:todos, pushing up their priority in my head. What it **should** have done is push up the priorities declared in the project description, managed by #:farelo. Which pushes the in-progress #:farelo up priorities (in my head).

Associated with that is **all project docs**, already high on my priorities.

I'm not in the mood for being systematic today, but today that's fine. To get the docs together I need to poke around with all the subprojects, remind myself where I'm at, write down their descriptions, current status & todos (which will ultimately be fed into #:farelo).
I can pick any part I fancy to play around with and in doing so I'm doing something that will be close to critical paths.

But right now, #:dogwalk #2 before it gets dark.
