# Integration

/home/danny/github-danny/hyperdata/workspaces/semem/articles/description_2025-01-13

> The semem project has a lot of rough code and tests. You will find the source and descriptions in project knowledge. The task today is to run the tests and get everything working accordingly. I will run things, your job is to implement anything missing and fix any errors.

I need to get Ollama running first...
```sh
ollama serve
  413  ollama list
  414  ollama ps
  415  ollama run qwen2:1.5b  
  416  ollama pull nomic-embed-text
  423  node src/ollama-example.js
  482  chmod 755 ollama-embedding-test.sh
```

...and I also need a SPARQL store. Might as well go with the #:tbox Docker container.

```yaml
healthcheck:
  test: ["CMD-SHELL", "wget -q --spider http://localhost:3030/$/ping"]
  interval: 30s
  timeout: 10s
  retries: 3

...
ERROR: Invalid interpolation format for "healthcheck" option in service "fuseki": "wget -q --spider http://localhost:3030/$/ping"
```

I ended up pulling Fuseki's healthcheck out, come back to it later.

#:todo add profiling, healthcheck with OpenTelemetry

Fuseki config's not quite as I want. RTFM time. Not sure I'd noticed this in the [Quick Start](https://jena.apache.org/documentation/fuseki2/fuseki-quick-start.html#publish-an-rdf-file-as-a-sparql-endpoint) before :
<blockquote>
<strong>Publish an RDF file as a SPARQL endpoint.</strong>
<p>
Unpack the distribution. Run </p>
<code>fuseki-server --file FILE /name</code>
</blockquote>

__*Neat!*__

Ok, for  I will need

#:todo add to system prompts - "Unless it's a very short snippet, always render code as individual, complete artifacts containing full source code.""

### Environments

#:todo a recommendation for #:um methodology

In project development you should consider accommodating the following environments (appropriately ringfenced), in decreasing order of stability :

* production
* staging
* development
* GPT nonsense

**Remember kids, hallucinations are a feature, not a bug!**

### Gonna Need a Bigger AI...

I got distracted. Spent a while playing with #:sheltopusik. Now it has a load more functionality, that doesn't work, and yet again I ran out of Claude tokens.

*back to tbox*

https://github.com/apache/jena/tree/main/jena-fuseki2/examples

note inference & shacl supported

```yaml
      - ./config/fuseki/databases/ds.ttl:/fuseki/configuration/fuseki/databases/ds.ttl

...
command:
   [
     "/bin/sh",
     "-c",
     "rm -f /fuseki/system/tdb.lock /fuseki/databases/*/tdb.lock && /jena-fuseki/fuseki-server",
   ]
```



## Bracelets

* nudge #:semem forward - needs Claude
* get #:packer working
  * packer config for  
* #:transmissions docs (with packer in mind)
* nudge #:tbox forward
* get #:postcraft working
*  

* clients
* Perplexity on FOAF
* SPARQL paper


* wood


* #:todo jsdoc -> turtle (for semem)
* #:todo link to #:adhd #:bracelets vid
* #:todo have http://purl.org/stuff/[nick] resolve to profiles

## hardinfo

Mari could use a usb wifi dongle. I found one, but `lsusb` isn't seeing it. Perplexity reminded me of `hardinfo` - Linux hardware util with a GUI!
