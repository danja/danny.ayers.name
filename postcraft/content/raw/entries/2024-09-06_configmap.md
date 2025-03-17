# Refactoring ConfigMap

This won't mean much to anyone else today, before I've done more docs for #Transmissions. But It's a bit twisty, writing it done will help me figure it out.

TODO copy some of this across for Transmissions docs

A transmission is a pipeline of services, each of the form :

```javascript

class Dave extends Service {
  constructor(config) {
    super(config)
  }

  async execute(message) {

    // process message

    this.emit('message', message)
  }

export default Dave
```

Each service should be relatively simple (for easy dev and to facilitate reuse). It will have a functional description (currently just in comments) called a #Signature.

---

The signature for `ConfigMap` ([current source below](#old-configmap)) includes the description :

> Maps RDF dataset contents to key-value pairs in the message object based on services-config.ttl

Ok...it is kinda doing that, but it's hardcoded for the #Postcraft flow. I need to look at the message before & after.

TODO message diff (premessage)->ServiceUnderTest->(postmessage)->Diff->(postmessage-premessage)

TODO setup [Jena command-line tools](https://jena.apache.org/documentation/tools/index.html) (has rdfdiff)

Actually I need `diff` before that - check I haven't made significant changes to the RDF when playing with #FOAFRetro. Checking [diff examples](https://www.geeksforgeeks.org/diff-command-linux-examples/)...

```bash
diff /home/danny/github-danny/transmissions/src/applications/postcraft/transmissions.ttl /home/danny/github-danny/foaf-retro/src/applications/postcraft/transmissions.ttl
```

Same.

```bash
diff /home/danny/github-danny/transmissions/src/applications/postcraft/services-config.ttl /home/danny/github-danny/foaf-retro/src/applications/postcraft/services-config.ttl
```

Same.

How to check the messages?

Handy, there's only one `ConfigMap` and it's early on. I can just pop in a couple of `ShowMessage` services followed by a `DeadEnd`:

```turtle
   trm:pipe (:s10 :SM :s20 :SM2 :DE  :s30 :s40  :s50 :s60 :s70 :s80 :s90 :s100
              :s110 :s120 :s130 :s140 :s150  :s160 :s170 :s180) .

:s10 a :DatasetReader . # read the manifest
# trm:configKey trm:describe .

:s20 a :ConfigMap ; ### use services.ttl? - defer to RemapContext as possible
    trm:configKey :markdownToRawPosts .
```

Running -

```bash
danny@danny-desktop:~/github-danny/transmissions$ ./trans postcraft.render ../postcraft/danny.ayers.name

...

+ ***** Execute Transmission : render <http://hyperdata.it/transmissions/render>
| Running : http://hyperdata.it/transmissions/s10 a DatasetReader
| Running :  (s10) SM a ShowMessage
***************************
***  Message
Instance of Object with properties -
{
  "dataDir": "src/applications/postcraft/data",
  "rootDir": "../postcraft/danny.ayers.name",
  "tags": "s10.SM"
}
***************************
| Running :  (s10.SM) s20 a ConfigMap
| Running :  (s10.SM.s20) SM2 a ShowMessage
***************************
***  Message
Instance of Object with properties -
{
  "dataDir": "src/applications/postcraft/data",
  "rootDir": "../postcraft/danny.ayers.name",
  "tags": "s10.SM.s20.SM2",
  "filepath": "layouts/mediocre/templates/entry-content_template.njk",
  "template": "§§§ placeholer for debugging §§§",
  "entryContentMeta": {
    "sourceDir": "content-raw/entries",
    "targetDir": "cache/entries",
    "templateFilename": "layouts/mediocre/templates/entry-content_template.njk"
  },
  "entryContentToPage": {
    "targetDir": "public/home/entries",
    "templateFilename": "layouts/mediocre/templates/entry-page_template.njk"
  },
  "indexPage": {
    "filepath": "public/home/index.html",
    "templateFilename": "layouts/mediocre/templates/index-page_template.njk"
  }
}
***************************
| Running :  (s10.SM.s20.SM2) DE a DeadEnd
DeadEnd  at (s10.SM.s20.SM2.DE) DE

```

Ok, these are being pulled out of (as `message.dataset`) :

```turtle
/home/danny/github-danny/postcraft/danny.ayers.name/manifest.ttl

# POST CONTENT
t:PostContent a pc:ContentGroup ;
    rdfs:label "entries" ;
    pc:site <https://danny.ayers.name> ;
    pc:subdir "home" ; # better property name?
    fs:sourceDirectory "content-raw/entries" ; # SOURCE DIR HERE journal, entries
    fs:targetDirectory "cache/entries" ;
    pc:template "layouts/mediocre/templates/entry-content_template.njk" .

# POST PAGES
t:PostPages a pc:ContentGroup ;
    pc:site <https://danny.ayers.name> ;
    fs:targetDirectory "public/home/entries" ;
    pc:template "layouts/mediocre/templates/entry-page_template.njk" .

# MAIN PAGE
t:IndexPage a pc:ContentGroup ; # TODO naming!
    pc:site <https://danny.ayers.name> ;
    fs:filepath "public/home/index.html" ;
    pc:template "layouts/mediocre/templates/index-page_template.njk" .
```

But the mapping are hardcoded in `ConfigMap.js`. They need to be declared in `services-config.ttl`.

I see a note in `transmissions.ttl` re. `ConfigMap`: 'defer to RemapContext as possible' but I'll ignore that for now, if necessary reconcile later.
First,

```
 async execute(message) {
      logger.setLogLevel('debug')
      ...
```

The `pc:ContentGroup` bits are getting picked out with :

```javascript
if (type.equals(ns.pc.ContentGroup)) {
  await this.processContentGroup(message, q.subject);
}
```

In need to generalise that in `ConfigMap.js`, replace `ns.pc.ContentGroup` with _something_ specified in `services-config.ttl`.

That _something_ needs to be pointed to in `transmissions.turtle`. Ok:

```turtle
:s20 a :ConfigMap ;
    trm:configKey :postcraftMap .
```

Those should be addressable from `service.config` but how, where's a good example of where I was addressing those?

Found one, in `FileCopy` :

```javascript
logger.debug(`FileCopy: Using configKey ${this.configKey.value}`);
source = this.getPropertyFromMyConfig(ns.trm.source);
destination = this.getPropertyFromMyConfig(ns.trm.destination);
source = path.join(message.rootDir, source);
```

That's derived from `transmissions.ttl`, eg :

```turtle
:cp30 a :FileCopy ;
    trm:configKey :cssCopy .
```

and in `services-config.ttl` :

```turtle
t:copyCSS a trm:ServiceConfig ;
    trm:key t:cssCopy ;
    trm:source "layouts/mediocre/css" ;
    trm:destination "public/home/css" .
```

So now I can make that part of the redirection for `ConfigMap` :

```turtle
t:PostcraftMap a trm:ServiceConfig ;
    trm:key t:postcraftMap ;
    trm:group t:SampleGroup .
```

Next I need to grab that in `ConfigMap` :

```javascript
logger.debug(`ConfigMap, Using configKey ${this.configKey.value}`);
const group = this.getPropertyFromMyConfig(ns.trm.group);
logger.debug(`ConfigMap, group =  ${group}`);
```

Yay!

```bash
| Running :  (s10.SM) s20 a ConfigMap
 api.logger debug
ConfigMap, Using configKey http://hyperdata.it/transmissions/postcraftMap
ConfigMap, group =  http://hyperdata.it/transmissions/SampleGroup

```

TODO while I'm here ... a little thing for `transmissions.ttl` : `trm:match "string"` so the service will be skipped unless `string` is matched. Thinking for XMPP agents.

<a id="old-configmap" class="anchor" />

### `ConfigMap.js` as on 2024-09-06 morning :

```javascript
// src/services/rdf/ConfigMap.js
/**
 * @class ConfigMap
 * @extends ProcessService
 * @classdesc
 * **a Transmissions Service**
 *
 * Maps RDF dataset contents to key-value pairs in the message object based on services-config.ttl
 *
 * ### Signature
 *
 * #### __*Input*__
 * * **`message.dataset`** - RDF dataset containing configuration
 *
 * #### __*Output*__
 * * **`message`** - Updated with mapped key-value pairs based on the dataset content
 *
 * #### __*Behavior*__
 * * Processes the RDF dataset in the message
 * * Identifies and processes different content groups (PostContent, PostPages, IndexPage)
 * * Maps relevant information to specific message properties
 *
 * #### __Tests__
 * * TODO: Add test information
 */

import ns from "../../utils/ns.js";
import rdf from "rdf-ext";
import grapoi from "grapoi";
import logger from "../../utils/Logger.js";
import ProcessService from "../base/ProcessService.js";

class ConfigMap extends ProcessService {
  constructor(config) {
    super(config);
  }

  /**
   * Executes the ConfigMap service
   * @param {Object} message - The message object containing the dataset
   * @todo Refactor for better generalization and maintainability
   */
  async execute(message) {
    //  logger.setLogLevel('debug')

    this.preProcess(message);
    const dataset = message.dataset;
    const poi = grapoi({ dataset, factory: rdf });
    const quads = await poi.out(ns.rdf.type).quads();

    for (const q of quads) {
      const type = q.object;
      if (type.equals(ns.pc.ContentGroup)) {
        await this.processContentGroup(message, q.subject);
      }
    }

    this.emit("message", message);
  }

  /**
   * Processes a content group based on its type
   * @param {Object} message - The message object
   * @param {Object} contentGroupID - The ID of the content group
   */
  async processContentGroup(message, contentGroupID) {
    switch (contentGroupID.value) {
      case ns.t.PostContent.value:
        await this.markdownToEntryContent(message, contentGroupID);
        break;
      case ns.t.PostPages.value:
        await this.entryContentToPostPage(message, contentGroupID);
        break;
      case ns.t.IndexPage.value:
        await this.indexPage(message, contentGroupID);
        break;
      default:
        logger.log("Group not found in dataset: " + contentGroupID.value);
    }
  }

  /**
   * Processes markdown to entry content
   * @param {Object} message - The message object
   * @param {Object} contentGroupID - The ID of the content group
   */
  async markdownToEntryContent(message, contentGroupID) {
    const postcraftConfig = message.dataset;
    const groupPoi = rdf.grapoi({
      dataset: postcraftConfig,
      term: contentGroupID,
    });

    // message.location = groupPoi.out(ns.pc.location).term.value
    // message.subdir = groupPoi.out(ns.pc.subdir).term.value
    message.filepath = groupPoi.out(ns.pc.template).term.value;
    message.template = "§§§ placeholer for debugging §§§";

    message.entryContentMeta = {
      sourceDir: groupPoi.out(ns.fs.sourceDirectory).term.value,
      targetDir: groupPoi.out(ns.fs.targetDirectory).term.value,
      templateFilename: groupPoi.out(ns.pc.template).term.value,
    };
  }

  /**
   * Processes entry content to post page
   * @param {Object} message - The message object
   * @param {Object} contentGroupID - The ID of the content group
   */
  async entryContentToPostPage(message, contentGroupID) {
    const postcraftConfig = message.dataset;
    const groupPoi = rdf.grapoi({
      dataset: postcraftConfig,
      term: contentGroupID,
    });

    message.entryContentToPage = {
      targetDir: groupPoi.out(ns.fs.targetDirectory).term.value,
      templateFilename: groupPoi.out(ns.pc.template).term.value,
    };
  }

  /**
   * Processes index page
   * @param {Object} message - The message object
   * @param {Object} contentGroupID - The ID of the content group
   */
  async indexPage(message, contentGroupID) {
    const postcraftConfig = message.dataset;
    const groupPoi = rdf.grapoi({
      dataset: postcraftConfig,
      term: contentGroupID,
    });

    message.indexPage = {
      filepath: groupPoi.out(ns.fs.filepath).term.value,
      templateFilename: groupPoi.out(ns.pc.template).term.value,
    };
  }
}

export default ConfigMap;
```
