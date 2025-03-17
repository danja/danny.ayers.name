# Perplexed

*Before getting out of bed, I signed up for a free month of [Perplexity](https://www.perplexity.ai/) and perplexed Claude*

## Paths

 A note-to-self before I forget.

 #:todo check how the [EYE](https://eyereasoner.github.io/eye/) reasoner uses [Euler](https://en.wikipedia.org/wiki/Leonhard_Euler) paths for #:semem

 I had a few overlapping requirements for a classical reasoner. Long story short, I found [EYE](https://eyereasoner.github.io/eye/) ticked many boxes. Notably it's [semantic Web](https://en.wikipedia.org/wiki/Semantic_Web)-friendly.

I have a lot of unknowns (in the [Donald Rumsfeld senses](https://en.wikipedia.org/wiki/There_are_unknown_unknowns)) around #:semem. I might have a short summary of what I'm after :

**Semem is an LLM-compatible context-aware, open-ended graph knowledgebase combining the advantages of vector embeddings and Linked Data technologies.**

Right now I'm still on the nuts & bolts, I've got fairly straightforward next steps to implement before the fun starts. The fun has many dimensions. From the above,

* **LLM-compatible** - this starts with boilerplate connectors to Ollama, the OpenAI API, the [Model Context Protocol](https://www.anthropic.com/news/model-context-protocol) etc. But an aspect of the *open-ended* I have in mind more broadly is exploring connectivity from a different perspective, that of inter-agent comms. This will go under the umbrella of #:LinguaFranche.  
* **open-ended graph** - this is the Web. Low-hanging fruit is hooking into existing SPARQL endpoints, eg. WikiData
* **context-aware** - I'm working on the vocabulary around this to express it more clearly, but the general idea is that you want more relevant knowledge getting more attention

Vector embeddings offer similarity measures, but the RDF (Web) model offers a whole different dimension.

Grrr! I went to LinkedIn to find a ref. related to this, instant distractions :
* [Spontaneous Emergence of Agent Individuality through Social Interactions in LLM-Based Communities](https://arxiv.org/abs/2411.03252) [sent to printer for later]
* [Declarative Prompts, LLM Agents, and their Programs. Oh my…](https://chimezie.medium.com/declarative-prompts-llm-agents-and-their-programs-oh-my-aab1d0da6fef) [from Chimezie, left open in tab for sooner]

A ref I can remember offhand is Bergi's material :

* [Unveiling the Unified Landscape: Bridging Knowledge Graphs and Machine Learning](https://www.bergnet.org/2024/05/unified-landscape/)  
* [Language Models Meet Knowledge Graphs - A Powerful Duo (plus a Wombat)](https://www.bergnet.org/2024/09/llm-kg-wombat/)
* *linked from there* [How to Implement Graph RAG Using Knowledge Graphs and Vector Databases](https://towardsdatascience.com/how-to-implement-graph-rag-using-knowledge-graphs-and-vector-databases-60bb69a22759) - Steve Hedden

#:todo put some FOAF where [Bergi's card](https://www.bergnet.org/people/bergi/card) links to it : http://danny.ayers.name/index.rdf#me
#:todo W6 link on https://hyperdata.it/xmlns/ is broken - make broken link finder #:transmission?

Enough gab, I'd better get on with this thing.
