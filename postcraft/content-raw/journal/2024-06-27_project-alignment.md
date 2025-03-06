# Project Alignment

_I've loads of notes broadly related to this, scattered around, but I don't think I've written down this specific part yet. I'll expand later, but a placeholder in a place I can find again is a start._

My perma-meta-project I've been working on for about 20 years started as an attempt at a personal knowledgebase, #PKB, but it soon morphed when it occurred to me that what I was after was really a project management system. There were reasons I wanted the PKB, clustered around _Getting Things Done_. I've been through several iterations, and various factors (including LLMs) have led me start again recently.

I work alone most of the time, with lots of different things on the go. I'm pretty bad at resisting interesting tangents, prone to [Yak Shaving](https://en.wiktionary.org/wiki/yak_shaving), exceptionally good at procrastinating. So one thing I really want this system to do is tell me what I should do next.

Architecturally, an approach to implementation, I've got a lot of that worked out. In short, express each project as a graph, with nodes representing tasks and edges representing dependencies. Weightings, like priorities and any time-related factors go in there too. Traverse the graph, with some lightweight reasoning, find the next task to do. I've got a basic [project ontology](https://hyperdata.it/xmlns/project/2024/owldoc/), have got quite comfortable working against a SPARQL store for the data, with custom browser-based UI as needed.

Right now I've got one project I'm running very late to schedule with, working title 'FOAF Retrospective'. But for to me to work anything like efficiently on _anything_, I need good information capture and organisation. Job One there is note-taking. I find a blogging kind of setup works well for me, and that's what you're looking at. Next on that list is capturing links, bookmarking. I've got the code together (/in-progress), #Transmissions, to give me tooling to make the dev side of these kinds of things easier for me.

Now I can get to the aspect I'm calling **Project Alignment**. While each of the FOAF, blogging, bookmarking projects can be considered independent, when decomposed into tasks, there is a huge amount of crossover. They have tasks in common. Their details might vary, but there's a functional requirement at the core of these that is near-enough. Put this way, these 3 projects are part of a larger dependency graph.

On the surface, despite an explosion in overall complexity in the dependency graph, the next-task question remains the same. In principle at least it's tractable with classic planner/reasoning algorithms. It is a 'simple' special case, in that there is only one agent (me) at work, analogous to a single thread in running code.

But standing back, it seems pretty apparent that there should be extra optimisations to be had. If component X of system A and component Y of system B are reasonably similar, replacing X & Y with a single component Z might be a win.

At this point in time I'm doing this very ad hoc, but #Transmissions is designed explicitly with reusability of components in mind. I'm hoping this will inform me of good ways to proceed. I can see LLMs being a big part of this in the near future.

But first things first, sketch out the general idea in black & white. Done.
