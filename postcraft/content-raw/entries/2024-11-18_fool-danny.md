# Fool Danny

_**"Doctor doctor! It hurts when I do this...**_

I've had a recurring problem with `npm` installs etc, because in the bunch of submodules I have below `hyperdata/packages` I have `hyperdata-static` which currently needs to be pinned to node v16. Anything nearby chokes on `node-gyp rebuild`.
In an idiot-party with Claude, ended up destroying `hyperdata-static` without fixing the gyp issue.

_**Stop doing that.**_

Continuing from `/home/danny/github-danny/hyperdata/docs/postcraft/content-raw/journal/2024-11-18.md`

```sh
# packages/hyperdata-desktop copied elsewhere first, just in case
cd ~/github-danny/hyperdata/
git submodule deinit -f packages/hyperdata-desktop
git rm -f packages/hyperdata-desktop
git commit -m "Removed submodule"
rm -rf .git/modules/packages/hyperdata-desktop
```

Hmm -

```sh
...
fatal: could not migrate git directory from '/home/danny/github-danny/hyperdata/packages/hyperdata-desktop/.git' to '/home/danny/github-danny/hyperdata/.git/modules/packages/hyperdata-desktop': Directory not empty
...
```

Dunno, try :

```sh
cd ~/github-danny/hyperdata/packages/semem
npm cache clean --force
rm -rf node_modules
npm install jasmine --save-dev
```

```sh
npm WARN ignoring workspace config at /home/danny/github-danny/hyperdata/packages/semem/.npmrc
```

ffs.

```sh
npm cache clean --force
rm -rf node_modules
nvm use default
npm install -g node-gyp
 npm install jasmine --save-dev
```

Finally!

I can't be arsed fixing `hyperdata-desktop` right now. Back to what I was trying to do 12 hours ago...
