# Bad Cleaner

Oriana's just arrived back from Switzerland. When she left she asked a mutual friend to clean her house (my No.7). I checked afterwards, it looked fine to me. But I didn't look closely, and didn't realise Oriana had given €30 to do 3 hours cleaning. Among other things, there were clothes left in the washing machine - now mouldy. Oriana left her a voice message asking for some of her money back. So assertive!

TODO employ Oriana as my PA

Ok, today I first want to push #form-a-matic along.

Claude had given me a broken namespace/term URI splitter, but when I described what I wanted it to do, it gave me a much improved version first shot.

I've since realised I do need to carry the ns of each term through into the JSON. Tweaking...


TODO https://www.digitalglobe.it/lavora-con-noi

I tweaked the form-a-matic code, the core stuff is now basically working. The JSON out is now looking much like another RDF serialization, so I went to check on the [JSON-LD](https://json-ld.org/) syntaxes. There isn't one *very* close, so I reckon I'll continue as-is.

I used the [JSON-LD Playground](https://json-ld.org/playground/), which has a graph visualization. That's been on my todo list forever (I've already got several, but all a bit old and/or not quite suitable for #Transmissions).
So naturally I got distracted and started making one, with the help of Claude, based on the Playground version (it uses [D3.js](https://d3js.org/)).

Ops.

Dogwalk time.


---
The goal today is to create nodejs es modules that will take Turtle syntax RDF and render is as a  graph diagram. The form-a-matic repo contains an example of parsing Turtle syntax, the json-ld-playground repo includes code for rendering a visualization of RDF using the D3 library.

Please follow these steps :

1. identify the code in the json-ld-playground repo that is used to generate visualizations. List the filenames.
2. examine the form-a-matic repo to find the JS represention it makes of the RDF model from the Turtle file
3. locate whichever point in the json-ld-playground visualization code that is most appropriate to take the the JS representation of Turtle and pass it to the visualizer
4. modify and/or create the necessary code to read a Turtle file and render a visualization

We got quite a way with this, but it looks like it'll take a good few more cycles. Leave it for now, 19:22 dogwalk 2 time.   

---
