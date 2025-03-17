# Postcraft Images

This should be a little thing...

Markdown format is :

```
![alt text](https://hyperdata.it/images/raw-data_320x480.png)
```

The markdown lib I'm using should understand that :

![alt text](https://hyperdata.it/images/raw-data_320x480.png)

I'd better check relative URLs :

```
![alt text](../images/not-an-image.png)
```

![alt text](../images/not-an-image.png)

Looking good. That gets rendered as :

```
<img src="../images/not-an-image.png" alt="alt text">
```

So now, image locations. I must have set up a folder or something...yup. Of the form :

```
danny.ayers.name/media/images/2024-08/
```

I'd better check how I've got the paths when sent to the server...

```
danny.ayers.name/public/home/index.html
```

Ok, what if I copy the dir to :

```
danny.ayers.name/public/home/media/images/2024-08/
```

(The `public/home` seems like an unnecessary bit of path, but I'll leave that for now).

Hmm. There are some semi-untested bits here. I guess safest is to copy application :

```
/home/danny/github-danny/transmissions/src/applications/postcraft
->
/home/danny/github-danny/transmissions/src/applications/postcraft-beta
```

Ok,

```
./run postcraft ../postcraft/danny.ayers.name
```

worked.

Next, look back how I did application `src/applications/file-copy-remove-test`

In `transmission.ttl` there's :

```
:s4 a :FileCopy ;
    trm:configKey :copyStartToSeveralEmpty .
```

In `services.ttl` there's :

```
t:copyStartToSeveralEmpty a trm:ServiceConfig ;
    trm:key t:copyStartToSeveralEmpty ;
    trm:source "data/start" ;
    trm:destination "data/several-empty" .
```

Hmm. The paths are relative to the application, ie. on my local machine in :

```
/home/danny/github-danny/transmissions/src/applications/file-copy-remove-test/data
```

I need them to be relative to the _target_ of the `postcraft-beta` application, ie.

```
/home/danny/github-danny/postcraft/danny.ayers.name
```

That should be going in the message somewhere. Time for a little probe, in:

```
/home/danny/github-danny/transmissions/src/applications/postcraft-beta/transmission.ttl
```

Lol, fool danny, I'm already using `FileCopy` :

```
:postTemplating a trm:Pipeline ;
    trm:pipe (:s00 :s10 :s11 :s12 :s20  :s30 :s40  :s50 :s60 :s70 :s80 :s90 :s100
                :s110 :s120 :s130 :s140 :s150  :s160 :s170 :s180) .

:s00 a :DatasetReader . # read the manifest
# trm:configKey trm:describe .

### Copy layout dirs
:s10 a :FileCopy ;
    trm:configKey :cssCopy .
```

In

```
/home/danny/github-danny/transmissions/src/applications/postcraft-beta/services.ttl
```

there is:

```
t:copyCSS a trm:ServiceConfig ;
    trm:key t:cssCopy ;
    trm:source "layouts/mediocre/css" ;
    trm:destination "public/home/css" .
```

So let me try adding an entry for the `media` dir as above.

```
:postTemplating a trm:Pipeline ;
    trm:pipe (:s00 :s05 :s10 :s11 :s12 :s20  :s30 :s40  :s50 :s60 :s70 :s80 :s90 :s100
                :s110 :s120 :s130 :s140 :s150  :s160 :s170 :s180) .

:s00 a :DatasetReader . # read the manifest
# trm:configKey trm:describe .

### Copy media dirs
:s05 a :FileCopy ;
    trm:configKey :mediaCopy .

### Copy layout dirs
:s10 a :FileCopy ;
    trm:configKey :cssCopy .
```

...

```
t:copyMedia a trm:ServiceConfig ;
    trm:key t:mediaCopy ;
    trm:source "media" ;
    trm:destination "public/home/media" .
```

I'll stick an image in the `media` source dir, and then:

```
![Claudio Grouse Hunting](media/images/2024-08/claudio-grouse-hunting.jpeg)
```

and maybe...
![Claudio Grouse Hunting](media/images/2024-08/claudio-grouse-hunting.jpeg)

Yay!

But the image is cropped. Can you specify scale in markdown? No wait, would be better to do in CSS, make it responsive.

So in `danny.ayers.name/layouts/mediocre/css/style.css`:

```
img {
  max-width: 100%;
  height: auto;
}
```

Double-yay!!!

This is **exactly** how #Transmissions is meant to work. Maximum reuse, minimum thought/effort.

`postcraft` application moved to `postcraft-previous`, `postcraft-beta` move to `postcraft`.

Job done.
