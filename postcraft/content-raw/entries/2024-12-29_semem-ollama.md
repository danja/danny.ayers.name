# Semem Ollama

#:semem, the **Semantic Memory** component of #:hyperdata I'm working on is a high priority for me, there are a lot of places I want to use it.

I want to try and get the most out of [Large Language Model](https://en.wikipedia.org/wiki/Large_language_model) and [Linked Data](https://en.wikipedia.org/wiki/Linked_data) integration. It's a seriously fertile space, huge potential, lots of **blue sky** for research. I've got a stack of ideas to try (many roughed out in scattered notes), but I'm following the dev strategy of prioritizing activities for which I have an immediate use. This has led me to [SPARQL](https://en.wikipedia.org/wiki/SPARQL) store-backed Graph [RAG](https://en.wikipedia.org/wiki/Retrieval-augmented_generation) as the inroad. About a year ago, to help get my head around this, I made a little [LlamaIndex](https://www.llamaindex.ai/) extension, [GraphRAG with SPARQL](https://github.com/danja/nlp/tree/main/GraphRAG). This was only a minimal proof-of-concept, but did give me a mental foothold.

The majority of the current activity in this space seems focused on using LLMs to derive [RDF](https://en.wikipedia.org/wiki/Resource_Description_Framework) models from text (this is what the bits above did). For my needs I'm putting the emphasis more on aligning LLM-interpreted text with existing ontologies. Ok, I'm developing ontologies in a just-in-time fashion, but still treating the resources there as "digital" (logically defined) anchor points for the "analog" (probabilistic) shapes around LLMs.

I made a couple of underlying design choices around my #:hyperdata uber-project. One is to favour Javascript. Not everyone's preferred language (see [What's Your Least Favourite Programming Language? (2024 soundcheck question) - Computerphile](https://www.youtube.com/watch?v=03lRzf7iSiU)), especially with AI dev being Python-first. But as I need to use JS in the browser it's a way of reducing my cognitive load (I'm really bad at remembering syntax). Another is to do things kind-of from scratch, avoiding frameworks (libs ok). I'm [dogfooding](https://en.wikipedia.org/wiki/Eating_your_own_dog_food) to the max because I want to understand what's going on.

A key part of #:semem is embeddings derived from text. A key tool I need asap is a similarity-based search across my scattered docs (so I'm not continually repeating myself). [TrustGraph](https://github.com/trustgraph-ai/trustgraph) is broadly the kind of system I'm aiming for, but that's big and quite blackboxy. While I was still going around in circles at a lower level, trying to decide which **vector DB** tooling to use, I stumbled on [memoripy](https://github.com/caspianmoon/memoripy). As the name suggests, it's Python. But it's an understandable size, has the general shape I'm after and uses specific well-known libs (eg. [Faiss](https://github.com/facebookresearch/faiss)) that all have **JS APIs**.

So for an initial setup for #:semem, the other week I got Claude to help me port it to JS. Once I'd got what appeared to be necessary coverage, I left it there, untested.

Coming back to it today I see most of the examples use the OpenAI API. I don't have any credit on that right now. But [Ollama](https://github.com/ollama/ollama) is also an option. I've got that set up locally, should do nicely to kickstart #:semem.

I had a quick skim of the available small [models](https://ollama.com/search). One I hadn't noticed before is [nomic-embed-text](https://ollama.com/library/nomic-embed-text). Ok, that looks a good candidate for my embeddings. When playing, I got very promising results with `orca`, `phi` and `qwen`. They still seem to be up there in the populars, so I some have initial LLM candidates already installed.
I can't remember when I last update Ollama itself, I'd better do that now.
The [manual install docs](https://github.com/ollama/ollama/blob/main/docs/linux.md) have this :

<blockquote>
If you are upgrading from a prior version, you should remove the old libraries with sudo rm -rf /usr/lib/ollama first.

Download and extract the package:   

curl -L https://ollama.com/download/ollama-linux-amd64.tgz -o ollama-linux-amd64.tgz
sudo tar -C /usr -xzf ollama-linux-amd64.tgz
</blockquote>

That'll take a while on this connection.

Dogwalk time.

---

```sh
ollama serve
Error: listen tcp 127.0.0.1:11434: bind: address already in use
```

Reboot o'clock.

```sh
danny@danny-desktop:~$ ollama run qwen2:1.5b  
>>> how are you?
I am an AI language model. How can I assist you today?
```

Sooo...

```sh
ollama pull nomic-embed-text
...
curl http://localhost:11434/api/embeddings -d '{
  "model": "nomic-embed-text",
  "prompt": "The sky is blue because of Rayleigh scattering"
}'
```
...which produces a lot of numbers. **Yay!**

The [Ollama page for nomic-embed-text](https://ollama.com/library/nomic-embed-text) has the cURL line above as well as py & JS snippets. It also links to a [nomic blog post](https://www.nomic.ai/blog/posts/nomic-embed-text-v1) about it. [Nomic have an API](https://docs.nomic.ai/reference/api/embed-text-v-1-embedding-text-post) for using the model, but I'll stick with Ollama's since I want to use it for GPT models as well.

I believe [Faiss](https://github.com/facebookresearch/faiss) has all the similarity search bits I need to get going on that front.

## Visualization

Nomic have a Data Mapping (#:visualization) blog post series, this one's very handy for me : [See Your Data With Dimensionality Reduction](https://www.nomic.ai/blog/posts/see-your-data-with-dimensionality-reduction). I've read papers on various algorithms but could only remember trad [PCA](https://en.wikipedia.org/wiki/Principal_component_analysis) off the top of my head. Mentioned here are also [t-SNE](https://en.wikipedia.org/wiki/T-distributed_stochastic_neighbor_embedding), Hinton & co's algorithm from 2008, [UMAP](https://arxiv.org/abs/1802.03426) from 2018 and one which appears to be proprietary, Nomic Project. I'm not sure if I've encountered UMAP before, but it sounds like a good choice for my purposes.

The next post in the series is [Why Are Web Browsers The Best Data Browsers?](https://www.nomic.ai/blog/posts/why-are-web-browsers-the-best-data-browsers), which, after preliminaries goes on to describe their own (open sourced) [deepscatter](https://github.com/nomic-ai/deepscatter). It looks good, but I've been around the block a few times with this stuff.

I'm using [RDF-Ext](https://rdf-ext.org) (RDF JS libs) nearby, and in there Bergi has a [RdfNetwork component][RDF-Ext](https://examples.rdf-ext.org/rdf-elements/). This is built on [Cytoscape.js](https://js.cytoscape.org/), which is a mature renderer from bioinformatics circles, so should be plenty good on scalability and scatterplotty things.

#:todo what was that cytoscape plugin that looked good for pipelines from somewhere around Eclipse?
#:todo check out the cytoscape/[mermaid integrations](https://mermaid.js.org/ecosystem/integrations-community.html)

Ok, I guess I should actually look at what I've got for #:semem code so far...
