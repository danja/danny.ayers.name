# RDF in Javascript

In a past life I used to use Java for everything. The Jena RDF libraries were the go-to. I don't recall having any major problems using Jena, beyond the usual initial learning curve for a new library.

Most of my coding had/has a browser front end, and when SPARQL came along this gradually changed how I worked with RDF. Ultimately I pretty much stopped using RDF directly in code at all, dealing instead with SPARQL queries & responses. Thing is, most of the time you're not really interested in the RDF model/datasets as a whole, more like a limited projection relevant to the task or application at hand. For a crude analogy, the Human Resources department doesn't need the entire corporate database, just the bits related to hiring and firing.

But now I have a need to work with RDF in Javascript. I've been using the

tweeted -
Humbled by Javascript!
A block of code gets a series of resources of a given type from an RDF dataset. A
`switch(instance){ case a: ...}`
directs each for processing.
Error.
So I spent 2 hours looking for a bug in my RDF handling.
I'd forgotten to put `return` in the cases.
