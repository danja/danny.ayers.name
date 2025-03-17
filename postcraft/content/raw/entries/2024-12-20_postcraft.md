# Postcraft

#:postcraft is an application of #:transmissions which I put while figuring out #:transmissions. It's a static site builder, you're looking at its product. Right now it's **a crufty, fragile, seriously over-engineered and breathtakingly inefficient static site builder**. But that's not a problem. Things *should* be coupled loosely enough that I can incrementally improve all this with minimal breakage along the way. *Should* be.

The fact that I've messed up the CSS somewhere but have no idea where suggests there *is* a problem.

I'm only using HTML/CSS/Vanilla JS for presentation, but it's all a bit of a lump right now. I need to tease out the bits that are actually in use, relocate and organise them in a way that I can work on them in isolation.

**Ew.** The current filesystem setup really is a shambles.

Ok, the root of this site when published locally is :
```sh
/home/danny/github-danny/postcraft/danny.ayers.name/public/home
...
ls
css  entries  fonts  index.html  js  media  static
```

In `index.html` is :
```html
<link rel="stylesheet" href="css/fonts.css" type="text/css" />
<link rel="stylesheet" href="css/grid-columns.css" type="text/css" />
<link rel="stylesheet" href="css/style.css" type="text/css" />
```

Hmmm. I put the `danny.ayers.name` material under `.../postcraft/` because it's been acting as test data. This might be a good time to move it somewhere more production-like. Ok, new repo : https://github.com/danja/danny.ayers.name

As a static site builder #:postcraft currently :
* copies a bunch of stuff from A -> B
* walks dirs transforming markdown -> html
* templates the individual entry pages
* templates `index.html`

I'd better remind myself of the #:postcraft #:transmission and the manifest I'm using for `danny.ayers.name`. Might as well make copies for future ref. It seems I'm using https://danny.ayers.name/static/ as the base for material that should be published verbatim. The word `static` isn't quite right, but I guess it fits ok with not-quite-right conventions.

There's a bit of chicken & egg here, the documentation for #:transmissions will be published using #:transmissions. Short version :
* A #:transmissions **application** is defined by its -
  * **transmissions**, the topology of the processing pipelines
  * **configuration**, the settings for the nodes in the pipelines, which are **processors**

The #:postcraft application has :
* [transmissions.ttl](/static/artifacts/postcraft/2024-12-20/transmissions.ttl)
* [config.ttl](/static/artifacts/postcraft/2024-12-20/config.ttl)
* [about.md](/static/artifacts/postcraft/2024-12-20/about.md) - the applications should mostly be self-documenting in the Turtle files (together with the processor signatures), but I've included these for out-of-band info, notes-to-self. I'll probably add an `about.ttl` later, hints for the machines.  

When a #:transmissions application is invoked, a **target** may be provided for instance-specific data. In this case, there's a `manifest.ttl` on the filesystem with the necessary for building the `danny.ayers.name` site.
* [manifest.ttl](/static/artifacts/postcraft/2024-12-20/manifest.ttl)

I've a *huge* amount of refactoring & tweaking to do around #:transmissions. Here the separation of concerns between config & manifest isn't very clean, vocab clunky. But I'm happy to call this fundamental structure done for now. There are a bunch of new features I plan to implement in the near future. But I've got to be careful about **priorities** (this is what I need #:farelo, kind-of project management tooling, also in-progress).  

Dogwalk...
...where was I?

Oh yeah, sources & destinations of things. First, I want another set of copies of those files. I should be more systematic and use for-purpose version control better. Showing my age here, I predate VCS. But simply making a copy of the application dir and calling it `postcraft-previous` works pragmatically.

`trans` is simply symlinked to a `run.js`, partial prep for something I dare put on the `$PATH`. `postcraft` the **application** here appears in #:transmissions' source tree (it doesn't have to, I'm following a strategy of minimising ties to the filesystem as I go along, but there's no rush to move it). The **target** is given as a relative path, where to look for a `manifest.ttl`.

I've slipped into my own little convention for locating repos on these Ubuntu machines :
```sh
 /home/danny/github-danny
 /home/danny/github-other
```
So most of the time when I'm coding I use `~/github-danny` as a temporary home.

Now how am I expressing the paths in [config.ttl](/static/artifacts/postcraft/2024-12-20/config.ttl)?

```turtle
t:copyStatic a trm:ServiceConfig ;
    trm:key t:staticCopy ;
    trm:source "content-static" ;
    trm:destination "public/home/static" .
```

And where does that wind up using when it's run?

Ok, I need that `about.md` note-to-self, give it a little tweak :
```sh
cd ~/github-danny/transmissions

./trans postcraft ../postcraft/danny.ayers.name | grep content-static
```

Ah. On my to-do list is swapping the hacky logger that's in #:transmissions now for a proper one, and have the thing support a `--verbose` flag. Not a biggy, I can force the log level to debug inside whichever **processor** is doing the copy.
Ok, here it is in
```turtle
### static dirs
:cp10 a :FileCopy ;
    trm:configKey :staticCopy .
```

I've only just added support for **processors** (implemented as ES modules) outside of the #:transmissions source tree, so this'll be:
```sh
src/processors/fs/FileCopy.js
```

Pop in ` logger.setLogLevel("debug")`, rerun the application+grep,
```
Copying directory from /home/danny/github-danny/postcraft/danny.ayers.name/content-static to /home/danny/github-danny/postcraft/danny.ayers.name/public/home/static
```

*It said that twice. Odd, but not a worry for today.*

Grr. Some jobs I need to do before it goes dark.
I'll just check what happens when I tweak the path :
```turtle
t:copyStatic a trm:ServiceConfig ;
    trm:key t:staticCopy ;
    trm:source "content-static" ;
    trm:destination "../../danny.ayers.name/static" .
```

```sh
./trans postcraft ../postcraft/danny.ayers.name | grep content-static

...
Copying directory: /home/danny/github-danny/postcraft/danny.ayers.name/content-static to /home/danny/github-danny/danny.ayers.name/static
```

Good-o, just as I'd hoped.

So now I'll just flip the path back, type `p` on my local machine - a script which will run the above, then push the result up to the server.
Next I `ssh` into the server, another little script :
```sh
cd /home/github-danny
./pull-all.sh
```

And this here should be live.

Break time. 
