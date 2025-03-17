# Semem SPARQ

*[Semem](https://github.com/danja/semem) doesn't quite SPARQL yet*

I was able to sort out the Faiss API issues from earlier so dove right ahead in implementing storage for #:semem that uses a remote SPARQL endpoint. Well, not quite -

```sh
Executed 45 of 45 specs (4 ERRORS) (33 FAILED) in 1 sec.
```

[SPARQLExample.js](https://github.com/danja/semem/blob/main/src/SPARQLExample.js) also fails miserably, when it tries to `UPDATE`. This might well be a problem with the target SPARQL store (Fuseki in the #:tbox Docker), I only set that up yesterday (?), haven't tested it properly yet. I suspect **auth**.

As usual Claude did most of the donkey work for me.

[SPARQLStore.js](https://github.com/danja/semem/blob/main/src/stores/SPARQLStore.js) (and there's a [CachedSPARQLStore.js](https://github.com/danja/semem/blob/main/src/stores/CachedSPARQLStore.js)) just use simple templating to create the SPARQL. But that's all it needs right now.

```javascript
_generateInsertStatements(memories, type) {
    return memories.map((interaction, index) => `
        _:interaction${type}${index} a mcp:Interaction ;
            mcp:id "${interaction.id}" ;
            mcp:prompt "${this._escapeSparqlString(interaction.prompt)}" ;
            mcp:output "${this._escapeSparqlString(interaction.output)}" ;
            mcp:embedding """${JSON.stringify(interaction.embedding)}""" ;
            mcp:timestamp "${interaction.timestamp}"^^xsd:integer ;
            mcp:accessCount "${interaction.accessCount}"^^xsd:integer ;
            mcp:concepts """${JSON.stringify(interaction.concepts)}""" ;
            mcp:decayFactor "${interaction.decayFactor}"^^xsd:decimal ;
            mcp:memoryType "${type}" .
    `).join('\n');
}
```

Yeah, I finally found a use for the [Model Context Protocol Ontology](https://purl.org/stuff/mcp) Claude & I put together almost a month ago.
