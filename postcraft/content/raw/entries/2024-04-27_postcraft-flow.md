# Postcraft Flow : 2024-04-27

_TODO - when more static place alongside `transmission.ttl` as `about.md`_

This is a work in progress, a sketch of the flow for the Postcraft pipeline. It's basically a Static Site Builder. It appears complex here, but that's a **feature!** Well, not exactly. The individual operations, which would typically appear as hardwired functions in a dedicated site builder are here implemented as independent services, connected at runtime via a definition that's expressed declaratively.

_Major refactoring required...later. But wherever possible here, instead of `execute(data, context)` favour `execute(false, context)`, with `context.default` instead of `data`._

A Turtle file `transmission.ttl` defines the general topology. Configuration details for the individual services are in `services.ttl`. The configuration specific to the site being built (dirs,templates etc) is supplied in `manifest.ttl`.

Right now the pipeline is a simple sequence of steps. The steps are executed in order, with the output of each step being the input to the next. There are forks in the pipeline at `PostcraftDispatcher` and `DirWalker`, but as the subsequent services are still just sequences of steps, it can still be thought of as a sequence.

In `transmission.ttl` the topology is defined as an `rdf:List` (confusingly aka an RDF Collection, see [Ordered data in RDF](https://ontola.io/blog/ordered-data-in-rdf)) using the concise Turtle syntax:

```
:postcraft a trm:Pipeline ;
trm:pipe (:s1 :s2 :s3 :s4 :s5 :s6 :s7 :s8 :s9 :s10 :s11) .
```

To run the pipeline, the following command is used:

```
./run postcraft /home/danny/HKMS/postcraft/danny.ayers.name
```

- `run` is a bash script for convenience, simply `node run.js "$@"`
- `postcraft` is the name of the pipeline (corresponding to a directory under `transmissions/applications/`)

* `/home/danny/HKMS/postcraft/danny.ayers.name` is the directory containing the site content, including `manifest.ttl`

The `postcraft` pipeline services are then, in turn:

#### :s1 a :ContextReader .

Reads `manifest.ttl` as a RDF/JS dataset, and extracts the configuration for the site being built.
Two values are passed into the context:

- context.rootDir (taken from the command line)
- context.dataset

The configuration now in `dataset` is used to set up the context for the rest of the pipeline.

#### :s2 a :ConfigMap .

_TODO use services.ttl?_

This scans `config.dataset` looking for any instances of the rdfs:Class `pc:ContentGroup`.

These will contain eg.

```
    fs:sourceDirectory "posts" ;
    fs:targetDirectory "site/blog" ;
    pc:template "layouts/mediocre/mediocre-posts_template.html" .
```

The RDF-Ext Grapoi lib is used to extract these values and insert them into the context as :

- context.sourceDir
- context.targetDir

additionally, a key is inserted into the context as:

- context.loadContext = 'template'

and the full path to the template is placed in `data` **and config.default** remember refactoring

const contextClone = structuredClone(context)

#### :s3 a :FileReader ; # the template

`FileReader` reads a file and passes on its contents. The file may be specified in `data` as in this case. (If not, it will be read using the configuration defined in `services.ttl`).

Where it places the content is determined by the key given by `context.loadContext` - here it's `template`, so the template content is placed in

- `context.template`

// what happened to pipeline trm:configKey :contextKey . ?

#### :s5 a :PostcraftDispatcher . # dispatch each content group

COMMENTED OUT

Currently this isn't doing much... work already done by ConfigMap

process forks here

#### :s6 a :DirWalker .

process forks here

which reads the content directory and dispatches each file entry to be processed individually.

' + contextClone.filename)

#### :s7 a :FileReader . # the markdown content

in : context.filename
context.sourceDir
out : context.content

if (context.loadContext) { // get rid?
context[context.loadContext] = content
}

#### :s8 a :PostcraftPrep .

sorts out filename & title

#### :s9 a :MarkdownToHTML .

uses marked lib

in: context.content is MD
out: context.content is HTML

#### :s10 a :Templater .

for now just using replace()

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

#### :s11 a :FileWriter .

### Utility Services

#### :NOP .

#### :s4 a :NOP .

No operation - a utility service that does nothing, helpful when making provisional changes to the pipeline.

#### :s4 a :Halt .

##### :s3 a :ShowMessage .
