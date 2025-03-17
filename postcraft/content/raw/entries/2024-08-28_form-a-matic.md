# Form-a-matic

Prompted by my need to capture project/task descriptions I've been wondering how to automate UI generation.

I can use #Transmissions for this!

1. upload vocab RDF to a SPARQL store
2. run selective query
3. render results as a form with checkboxes to tag desired properties
4. submit back to SPARQL store
5. query again
6. render results as a FOAF-a-matic style form

I will need a few new Transmissions services. Claude can help a lot, I'd better leave this until I have access again.

Easiest wiring would be to use the #SPARQL-Diamonds trick. But using #RDF-Ext would also be nice, no store dependency.

PS. I revisit this at [Goon](https://danny.ayers.name/entries/2024-09-10_goon.html)
