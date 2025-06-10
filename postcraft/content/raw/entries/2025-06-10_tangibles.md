# Where are the Tangibles?

**tl;dr** : [Schema.org](https://schema.org/) has terms for [Thing](https://schema.org/Thing), [Intangible](https://schema.org/Intangible) and [Product](https://schema.org/Product), but no obvious way of describing a tangible thing that isn't necessarily a product.
I suggest the obvious : **https://schema.org/Tangible**, which could be inserted quietly without breaking anything.

## Motivation

One of my many projects-in-progress is a *Personal Project Manager* I'm calling #:Farelo.I need a model in which to describe projects, which, this being 2025, will be an ontology expressed in RDF/OWL (#:why-rdf). As it happens have had one intermittently in progress for over 20 years, it lives at [https://purl.org/stuff/project](https://purl.org/stuff/project). Some bits I'm happy with, some not so much, and there are one or two terms I intend adding. It also needs alignment with [Schema.org](https://schema.org/), which seems to have taken the role of quasi-upper, maybe *Standard Über Ontology*.

I really need the app *yesterday*, to manage [my tensegrity structure](https://github.com/danja/tensegrity) of projects with confusing interdependencies. But rather than trying to work with the software project domain right away, I thought a real-world project would be less confusing as a target. A project I have in progress is a reboot of my music room. It goes something like this :

### Music Room Reboot Project

* Shift everything out of the room
* Redecorate, make furniture,
* Apply acoustic treatment (hang mattresses from the walls)
* Clean, test and if necessary fix all the pieces of equipment
* Shift everything back into the room
* Make a lot of noise

It is a nice use case for a project management app as there are parts that are strictly sequential : I won't want to hang mattresses before redecorating. But some bits can happen in parallel : I have shifted pretty much everything out into the office, where I've wired a bunch of things temporarily, so I can make a lot of noise while everything else progresses.

Ok, so how do I model all this? Something major I am missing from the current version of the project ontology is the concept of **project resources**. These have a definite impact on dependency graphs. In the real world, I need to purchase paint (done!) before I can redecorate (soon...).

But, again in the real world, above I have *all the pieces of equipment*. For example, a mixer. 

(the [Vinocaster](https://hyperdata.it/stuff/vinocaster/))

## Stuff, a Set of Things

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
