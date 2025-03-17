# Improving this Blog

I've been away for a week, just long enough to forget where I was up to.

```
cd ~/github-danny/transmissions
./run postcraft /home/danny/github-danny/postcraft/danny.ayers.name
```

That's giving me the journal. I want entries.
That's in :

```
/home/danny/github-danny/postcraft/danny.ayers.name/manifest.ttl
```

Grrr. It's in chrono order.
OK, tweaked :

```
src/services/postcraft/FrontPagePrep.js
```

There are some little todos need doing around there, but it's good enough for now.

Permalinks next.

```
https://danny.ayers.name/home/2024-08-25_blog-improving.html
```

needs to be relative.

files are under

```
http://localhost/DANNY.AYERS.NAME/entries/
```

Sheesh, this thing needs so much refactoring!!

Found it :

```
/home/danny/github-danny/transmissions/src/services/postcraft/PostcraftPrep.js

was
message.contentBlocks.link = message.siteURL + '/' + message.contentBlocks.relURL

```

on server

```
root@hyperdata:/home/www/danny.ayers.name#
git pull
```

## TODO

- images
- Atom feed
- add articles, journal entries etc
- wipe old versions
