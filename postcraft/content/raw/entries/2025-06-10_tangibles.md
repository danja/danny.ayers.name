# Where are the Tangibles in Schema.org?

**tl;dr** : [Schema.org](https://schema.org/) has terms for [Thing](https://schema.org/Thing), [Intangible](https://schema.org/Intangible) and [Product](https://schema.org/Product), but no obvious way of describing a tangible thing that isn't necessarily a product.
I suggest the obvious : **https://schema.org/Tangible**, which could be inserted quietly without breaking anything *(details at the bottom here)*.

## Motivation

One of my many projects-in-progress is a *Yet Another* **Personal Project Manager** I'm calling #:Farelo.I need a model in which to describe projects, which, this being 2025, will be an ontology expressed in RDF/OWL (#:why-rdf). As it happens I've been working on this intermittently for over 20 years, I have a vocab that lives at [https://purl.org/stuff/project](https://purl.org/stuff/project). Some bits I'm happy with, some not so much, and there are one or two terms I intend adding. It also needs alignment with [Schema.org](https://schema.org/), which seems to have taken the role of quasi-upper, maybe *Standard Über Ontology*.

Right now I really need the app *yesterday*, to manage [my tensegrity structure of projects](https://github.com/danja/tensegrity) with confusing interdependencies. This time around, rather than trying to work with the software project domain right away, I thought a real-world project would be illuminating as a target. A project I have in progress is a reboot of my music room. It goes something like this :

### Project : Music Room Reboot

* Shift everything out of the room
* Redecorate, make furniture,
* Apply acoustic treatment (hang mattresses from the walls)
* Clean, test and if necessary fix all the pieces of equipment
* Shift everything back into the room
* Make a lot of noise

It is a nice use case for a project management app as there are parts that are strictly sequential : I won't want to hang mattresses before redecorating. But some bits can happen in parallel : I have shifted pretty much everything out into the office (it's no longer in the initial **state**), where I've wired a bunch of things temporarily, so I can make a lot of noise while everything else progresses.

## Stuff, a Set of Things

Ok, so how do I model all this? Ok, I've got most of what I need already covered in the project ontology, though major I am missing from the current version of the  is the concept of **project resources**. These have a definite impact on dependency graphs. In the real world, I need to purchase paint (done!) before I can redecorate (soon...).

But, again in the real world, above I have *all the pieces of equipment*. For example, an analog mixer. It's a [Behringer Xenyx 2442FX](https://www.behringer.com/behringer/product?modelCode=0601-ABT). The device is listed as a **product**, and that fits with Schema.org's term [Product](https://schema.org/Product) :
> Any offered product or service. For example: a pair of shoes; a concert ticket; the rental of a car; a haircut; or an episode of a TV show streamed online.

Almost. It certainly *was* a product, before I bought it. I'm very unlikely to offer it as a product again - even if I'm able to get the couple of dead channels working, it also features some metalwork damage from the time I broke an acoustic guitar on it (a sudden power outage corrupted a whole day's work, I was very annoyed). Resale value - I'd probably give €20 for it if I was really stuck.

Also in the *stuff* is my primary guitar, [The Vinocaster](https://hyperdata.it/stuff/vinocaster/). A custom job, made by me to be exactly what I wanted. Which, for all practical purposes, it is. It is a **product** in the sense that I produced it (*over many, many hours*). But that's not how `schema:Product` is defined.

## Rock

Going a step further, how do I describe the subject of this image :



Ok, so the Schema.org vocab is maintained largely by corporate entities, in the view of which **the Web is a marketing tool**. Chances are my local browser has encountered Schema.org terms in **HTML <meta> tags** a few dozen times already today. Thing *[sic]* is, **the Web is more than just a marketing tool**.




Tangible is a subclass of Thing disjoint from Intangible. It has the description of "a thing which is apprehensible as physically real or existent by the senses". Product is a subclass of the union of Tangible and Intangible.

### A Modest Proposal

```turtle
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix rdfs: <http://www.w3.org/2000/01/rdf-schema#> .
@prefix dc: <http://purl.org/dc/elements/1.1/> .
@prefix schema: <http://schema.org/> .
@prefix : <http://example.org/ontology#> .

# Define Tangible as a subclass of Thing, disjoint from Intangible
schema:Tangible a owl:Class ;
    rdfs:label "Tangible" ;
    dc:description "a thing which is apprehensible as physically real or existent by the senses" ;
    owl:subClassOf schema:Thing ;
    owl:disjointWith schema:Intangible .

schema:Product a owl:Class ;
    owl:subClassOf [
        a owl:Class ;
        owl:unionOf ( schema:Tangible schema:Intangible )
    ] .
```
