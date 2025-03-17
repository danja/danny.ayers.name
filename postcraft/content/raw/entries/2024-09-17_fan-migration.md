# Fan Migration

It's chilly. The summer fans have gone down into the cantina for winter, the fan heaters have come up.

**Grrrrr**, the Pulsar install had a little brokenness, I wanted to turn off autocomplete on `.md` but loading packages for settings wasn't working.

I moved pre-existing `~/.pulsar` out of the way and reinstalled - it needed

```
~/github-danny/pulsar$ nvm use
```

Packages still not being found. Got a minimal error message on command line :

```
[79459:0917/125131.490332:INFO:CONSOLE(223)] "Fetching local packages failed. Error: Fetching local packages failed.
    at createProcessError (/home/danny/github-danny/pulsar/node_modules/settings-view/lib/package-manager.js:575:17)
```

Ok, I haz source & AI...

```bash
cd src
repopack --verbose -c ../repopack.config.json
cd ../docs
repopack --verbose -c ../repopack.config.json
```

(needed a new terminator session so it used the right nodejs)

Distracted - little admin/productivity jobs -

Moved my _Daily_ tabs from Brave to Opera. Dark theme so I can see.

Fixed one problem with Pulsar, I had an env var in `.bashrc` pointing to the wrong path for `apm`. Not entirely fixed yet, need to `apt upgrade`...

I've decided to give myself a deadline for doing a release of #Transmissions etc, announcements... 2024-10-31

This really calls for me to figure out task priorities. That starts with capturing tasks.
Onto #fom-a-matic, [latest notes](https://danny.ayers.name/entries/2024-09-10_goon.html).

Hmm. Docs should go under #farelo. Need to set that up first **why oh why are the yaks so hairy!?**

Ops. I was in the process of moving Farelo to the #hyperdata monorepo, so I've got (at least) two different dirs...
```
/home/danny/github-danny/hyperdata/packages/farelo
/home/danny/github-danny/farelo
```
Two different repos.

The `form-a-matic` source so far is a transmission defined under `trans-apps` using services under transmissions. I have notes on shifting the services elsewhere, but that's not high priority.

After a couple of real-world odd jobs.
