# FOAF Retro Push

---

A little precursor to the precursors below, a workaround for my setup not yet supporting HTML anchors in markdown. Below is :

```
<a id="yak-hairs" class="anchor" />

## Yak Hairs
```

<a id="yak-hairs" class="anchor" />

## Yak Hairs

- [x] #Transmissions external app call
- [x] publish FOAF Retro

### Transmissions external app call

In the `transmissions` dir (on my destop machine, `/home/danny/github-danny/transmissions`) :

```
./trans -d ../foaf-retro/src/applications postcraft ../foaf-retro/docs/postcraft
```

should run the application `postcraft` described in the dir `../foaf-retro/src/applications` with the target `../foaf-retro/docs/postcraft`

TODO integration tests for eg. :

```
./trans postcraft ../postcraft/danny.ayers.name

./trans -d ../foaf-retro/src/applications postcraft.render ../foaf-retro/docs/postcraft
```

It looks like it's running ok but the index page isn't getting properly build.

Using the single transmission `postcraft.render` does reduce the material logged, but it would be better if there was a bit more flow control to skip services.

TODO a `GOTO` service!

D'oh! I bet it's the loop I've got going through the most recent posts.

It was!!!

```
 for (let i = rangeEnd; i > rangeStart; i--) {
...
 for (let i = rangeEnd; i >= rangeStart; i--) {
```

Fixed.
