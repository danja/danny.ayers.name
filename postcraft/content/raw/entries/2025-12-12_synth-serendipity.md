# Flues Synth

**tl;dr** I built a sound synthesizer that runs on a Raspberry Pi

The GitHub repo [flues](https://github.com/danja/flues/) contains most of my recent synth experiments (various platforms, including [live Web](https://danja.github.io/flues/)), the Raspi material is under [flues-synth](https://github.com/danja/flues/tree/main/flues-synth).

There are binaries of the Raspi synth and builds from Ubuntu of the lv2 plugins in the repo, but these versions are untested (used Claude-authored scripts)- building from source definitely works.

## What is Flues?

**Flues** (`flues-synth`) is an experimental polyphonic synth for the [Raspberry Pi](https://www.raspberrypi.com/). It is designed to run headless, without a UI. Input comes from a USB MIDI adapter. Output comes from either the Pi's headphone jack or a USB audio interface (other sound outputs such as HDMI and I2C HATs should work, but these are untested). It runs comfortably on a Raspi 4 1GB, I haven't tested on anything else.

Internally the synth engine is composed of the following modules :

* Disyn oscillators - a collection of novel synthesis algorithms (related to FM)
* Stove physical modelling subsystem
* Chatterbox formant filter subsystem
* Simple AR envelope

The `flues-synth` [README.md](https://github.com/danja/flues/tree/main/flues-synth) has more details. There are [live Web versions](https://danja.github.io/flues/) of the different subsystems that give an idea of the kind of sounds available.

A set of MIDI Programs provide various configurations of the modules, essentially presets. The parameters of these may be controlled using MIDI CC messages. Each Program exposes 9 core channels which may, for convenience, be mapped to external controllers using the [flues-control](https://github.com/danja/flues/tree/main/lv2/flues-control) lv2 plugin in a DAW.

(There are 9 channels because that's how many worked on my old MK-449 keyboard. I have since started using the sliders of an Akai Midimix for the purpose, via `flues-control`).

There is also a [browser-based UI](https://github.com/danja/flues/blob/main/flues-synth/web-ui/README.md) set up to supply control messages but this hasn't been maintained beyond its use in initial experiments.  

 Parameters are controlled by MIDI CC messages.

## What Didn't Work

What I actually wanted initially, what led me here, was a Eurorack module that could do [physical modelling synthesis](https://en.wikipedia.org/wiki/Physical_modelling_synthesis). It's a paradigm that really appeals to me, not only because it can make realistic instrument sounds, but because it can make sounds that no physical object could have created. I couldn't find a module that was affordable, so decided to make one. Long story short, so far I've made a total pig's ear of the hardware side. Mistakes in ordering components, mistakes in fabrication decisions, etc etc.   *To be continued...*
