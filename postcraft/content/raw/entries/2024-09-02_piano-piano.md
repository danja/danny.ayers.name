# Piano Piano Task Force and Namespaced Hashtags

I'll need help from AI to get the wording of this more quotable, but something like :

> The slow worker has the advantage of being able to take their time to think about things.[^1]

I am a slow worker and a slow thinker. Of course I'd rather I was Mr. Lightspeed[^2] externally and quick-witted[^3] internally. But there is a plus side to each failing (#neurodivergence). A case in point.

I've gravitated to two formats for stuff I write : [Markdown](https://en.wikipedia.org/wiki/Markdown) for any text, [Turtle](https://en.wikipedia.org/wiki/Turtle_(syntax) for any data (for code I currently favour JS, another story).

You can say anything in #Turtle (ok, with provisos [^4]). But there aren't many vectors through which to cleanly and _easily_ extend markdown. Bridging the two has been lurking around my #todo lists for while.

With [Postcraft](https://github.com/danja/postcraft) as my first practical application of my pipeliney thing [Transmissions](https://github.com/danja/transmissions), I have been pondering what I might slip in. A page like this is written in markdown, a _transmission_ is used to render it to HTML. But into that transmission I can throw in whatever pre-processors I fancy.

So today it occurred to _slowww_ Danny, there's an low-effort/high-value thing available :

## Namespaced Hashtags {#namespaced-hashtags}

### Motivation

Ok, so #hashtag is a convention for a keyword. But it's all very folksy, prone to ambiguity, is #swift a bird or a singer?

In practice, I want to get my tokens as cleanly separated as I can, so they get a head start in vector space.

I bet someone's done this before, but still, this :

### Specification

_ok, first pass, formal-ish :_

1. Within any document resource, a string of the form `#hashtag` will be assumed to have no significance under this specification.
2. Within a document resource, eg. `http://example.org/birdies.md` a string of the form `#ns:hashtag` will be interpreted as a pair of identifiers associated with the document, `ns` and `hashtag`.
3. Within the domain `http://example.org` a document resource a string of the form `#ns:hashtag` SHOULD have an easily-accessible means of interpreting the significance of `ns` and `hashtag`
4. `ns` will identify a namespace (as per XML & RDF prefix notation), which SHOULD be associated with a URI
5. `hashtag` will identify a term which SHOULD be defined within the namespace document and identified with a URI, eg. `http://example.org/terms/swift`
6. `#ns:hashtag` MAY be interpreted as the statement `<http://example.org/birdies.md> rdfs:seeAlso <http://example.org/terms#swift> . (and whatever else)

_in practice..._

Not entirely sure yet, but in the _transmission_ I'll regex/template this out so that `#ns:hashtag` turns into something like:

```
[#hashtag](http://example.org/terms?ns-hashtag)
```

Respond to that on the server with the results of a SPARQL query and/or vector similarity giving the term defn and/or related pages.

- TODO RFC refs for all the terms above
- TODO [BNFs](https://en.wikipedia.org/wiki/Backus%E2%80%93Naur_form)
- TODO write up #h:griller spec (GRDDL for JSON & markdown)

Previous notes at :

```
postcraft/danny.ayers.name/content-raw/todo/2024-08.md
->
 `transmissions/docs/postcraft-site/todo/turtle-markdown.md`
```

- grrr, footnotes

[^1]: This is on my #todo list:

<p xmlns:cc="http://creativecommons.org/ns#" xmlns:dct="http://purl.org/dc/terms/"><a property="dct:title" rel="cc:attributionURL" href="https://danny.ayers.name">The Bumper Book of danja quotes</a> by <a rel="cc:attributionURL dct:creator" property="cc:attributionName" href="https://danny.ayers.name/me">Danny Ayers</a> is licensed under <a href="https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank" rel="license noopener noreferrer" style="display:inline-block;">CC BY 4.0<img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1" alt=""><img style="height:22px!important;margin-left:3px;vertical-align:text-bottom;" src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1" alt=""></a></p>

- grrr, footnotes

[^2]: Another danja quote I would like out there is a modified version of the saying (questionably) attributed to [Sun Tzu](https://en.wikipedia.org/wiki/Sun_Tzu) :

> If you wait by the interweb stream long enough, the implementation of your amazing idea will float by.

- grrr, footnotes

[^3]:
    Maybe 8 years ago I was with my cousin Nick in a kitchen (at Geil Torrs?). He had an Elvis fridge magnet in his hand. As he stuck it onto the fridge, he said **"Elvis is cool!"** I nodded, smiled, said _"Yup, he sure is."_. Nick repeated the gesture and words several times. I responded, increasingly bemused _"yeah..."_, before he gave up. It must have been about 3 years later, I was dozing off in bed, it finally hit me : _Elvis...cool...fridge_. Oh yeah, **now I get it!** I am genuinely really slow-witted.
    _PS. I mentioned this in chat with Nick. He reckoned I had false memory syndrome. Ok, that's impossible to confirm or refute, but is definitely more fun-twisted if he's right._

- grrr, footnotes

[^4]: I like to take a simplistic approach with data. Core [RDF](https://en.wikipedia.org/wiki/Resource_Description_Framework) covers most of my bases, Turtle is nice and easy. Ok, at minimum [Named Graphs](https://en.wikipedia.org/wiki/Named_graph)[^5] are essential too, especially when using [SPARQL](https://en.wikipedia.org/wiki/SPARQL). But while definitely _nice-to-know-they-exist_, personally I've never actually found need for specs like [TriG](<https://en.wikipedia.org/wiki/TriG_(syntax)>) or [RDF-\*](https://www.ontotext.com/knowledgehub/fundamentals/what-is-rdf-star/). I'm happy with the assumption that if there's an RDF resource at say http://hyperdata.it/, then (depending on the format defn) it MAY be considered a graph with the name `http://hyperdata.it/'.

- grrr, footnotes

[^5]: The Wikipedia page for [Named Graphs](https://en.wikipedia.org/wiki/Named_graph) is still largely as I created it in 2010 (hat tip to self, but it did take me me 5 years to see their value, slowwww). TODO ping @bobdc & Jeremy Carroll, prompt them to revise that page.

### Footnote testing

This was also a test to see if the markdown processor I'm using, [marked](https://marked.js.org/) understood GitHub-flavoured markdown footnotes. It didn't out of the box, but there was an easy-to-add extension, [marked-footnote](https://www.npmjs.com/package/marked-footnote). I've also added [marked-code-format](https://github.com/bent10/marked-extensions/tree/main/packages/code-format) There was a version conflit with [marked-gfm-heading-id](https://github.com/markedjs/marked-gfm-heading-id) so I tried [marked-custom-heading-id](https://www.npmjs.com/package/marked-custom-heading-id), which didn't work. I made have to code something up for that.
