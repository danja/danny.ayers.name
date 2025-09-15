# Semem Progress Report

tl;dr - my Semantic Web Memory for Intelligent Agents is now kinda deployable

I've just passed a little milestone with this project so time to take stock. The milestone is getting the thing to run on a machine other than my office desktop - I've got it on my server at [semem.tensegrity.it](https://semem.tensegrity.it/) It's running in a Docker container which proved a little challenging because it uses Facebook's [faiss](https://github.com/facebookresearch/faiss) for similarity measures, and though I'm using Node.js throughout, that depends on native libs which have to be built first time around. But **it worked!**

*To some relative measure of worked.*
Thing is, although I've been very principled about architecture *in my head* (this is an Ontology-Driven Design, **ODD**, for heaven's sake), I've been delegating an awful lot of the donkey work to Claude Code, with all that entails. But this is very much an experiment, a research project. A big part of this is about figuring out the methodologies for using AI assistants in dev.

I've been working on Semem for about 10? months now, but it is really just the latest phase in something I've been working on for 25? years : **a knowledge management system that works for me!** I have lots of projects on the go all the time but am terribly undisciplined about things and have a terrible memory.
