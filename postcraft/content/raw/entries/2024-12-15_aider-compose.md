# Aider Composer

Installing [Aider Composer](https://github.com/lee88688/aider-composer) [VSCode](https://code.visualstudio.com/) extension.

*This took me a silly amount of time, I'd better make a note.*

I installed the extension from VSCode's package section. Nothing showed up, so **RTFM**.

The instructions were clear (in retrospect):

1. Install Python
2. Install the required packages using: `pip install aider-chat flask`
3. In VSCode, set `aider-composer.pythonPath`

I'd already got Python, but I've had a lot of distractions since I last used it. I know I was using `venv` for something last time, but can't remember quite how. So for 2. I just went global, as it's written above. This took a while and produced *lots* of output, but on the last few lines I only saw warnings, so went straight on to 3.

For 3. the docs say :
> The directory containing the Python executable (not the Python executable path itself) where aider.chat and flask packages are installed. This setting is required for the extension to activate.

I did a fair bit of hunting, starting with :
```sh
which python3
...
/home/danny/.local/bin/python3
```

Looking around there, it seemed `/home/danny/.local/bin` contained loads of Python binaries so I put that in. Turned out this was what was needed, although **Aider Composer still wasn't showing up**. Backtrack...

The `pip install aider-chat flask` hadn't worked. Not even close. Two root issues : I'd already got an **older version** of [Aider](https://aider.chat) (command line) installed; **dependency hell**.

So I started by following instructions to update Aider, which failed, but did give some clues.
**The fix** I found was to run this :

```sh
python -m pip install aider-chat --force
```

  \- which would fail with dependency errors. So I went through each of those using this syntax pattern:

```sh
pip install "matplotlib>=3.8"
```
\- trying the `aider-chat` install again, fixing next error. Finally success.

Back into **VSCode**, and the extension was now showing up. **Woo-hoo!** But the output log had this :
```sh
2024-12-15 13:39:00.883 [info] Starting aider-chat service...
2024-12-15 13:39:00.883 [warning] Multiple workspace folders found, skip starting aider-chat service.
```

Took me a while to twig. The workspace I had open had 4 or 5 project folders in it. When I did `Open Folder...` on a **single project**, the service started up ok.

Next, **Aider Composer settings**. Which API/model? I've got a few $s left on the Anthropic API (*few*, because [Cline](https://github.com/cline/cline) had been very greedy last time I was there). I didn't know how to name the model, but googling took me to the [aider leaderboard](https://aider.chat/docs/leaderboards/). I went with the top one today, `claude-3-5-sonnet-20241022`.

Next I needed an API key. I knew roughly where I'd put one, but it still took a few minutes to find. My dog is called Claudio, I've been chatting with ClaudioB recently (who coincidentally recommended to me a few weeks ago). I also had some keep-safe material relating to a couple of prints by the **French** (note that) painter [Claude](https://en.wikipedia.org/wiki/Claude_Lorrain) I was trying to sell a couple of years ago.

Anyway, I found the API key, put it in, saved settings. All looked good. **Aider Composer chat window**, ok try :

> Please give a brief description of the current project.

*Aider Composer Claude* responded :

> Je ne vois pas encore de code partagé, donc je ne peux pas donner de description du projet pour le moment. Une fois que vous aurez partagé des extraits de code avec moi, je pourrai analyser le projet et vous fournir une description détaillée.

My **French** ain't tres bonny, but I understood that.

In the source folder I had a concat file of the project made with [repomix](https://github.com/yamadashy/repomix). So I pointed the chat at that and repeated the request above.

*Really* good response. I was a bit confused when it ended with :

> Q1: Would you like more details about any specific aspect of the architecture? Q2: Are you interested in the RDF/Semantic Web features specifically? Q3: Would you like to know more about the development setup and workflow?

Very familiar. Ah... The repomix file included a **system prompt** I'd used elsewhere, which included :

> After each response, provide three short follow-up questions worded as if I'm asking you. These should help clarify the original topic and identify more detailed avenues of research. Label as Q1, Q2, and Q3. If I say Q1, Q2 or Q3, address the corresponding question. If I say Q0, repeat the previous request.

*That's quite an old version, Ive tweaked since then, but you get the gist.*

Kinda cool that Claude read the prompt as a prompt.

It's all looking good, time for a break.
