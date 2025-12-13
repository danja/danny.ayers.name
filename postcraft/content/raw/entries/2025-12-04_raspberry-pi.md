# Runny floozy-poly on Raspberry Pi

Home dir `/home/danny/`

 aplay -Dhw:2 /usr/share/sounds/alsa/Front_Center.wav

sudo apt install pkg-config cmake build-essential lv2-dev libx11-dev libcairo2-dev lilv-utils jackd2 jalv

mkdir github
cd github

git clone https://github.com/danja/flues.git

cd flues

cmake -S lv2/floozy-poly -B lv2/floozy-poly/build
cmake --build lv2/floozy-poly/build
cmake --install lv2/floozy-poly/build --prefix ~/.lv2   # optional

sudo dpkg-reconfigure -p high jackd2

lv2ls | grep -i floozy
https://danja.github.io/flues/plugins/floozy-poly

  sudo usermod -aG audio $USER
  # log out/in

 JACK_NO_AUDIO_RESERVATION=1 jackd -S -P40 -dalsa -dhw:2 -r48000 -p512 -n3 -P &
 # verify it’s up:
jack_lsp
# launch the plugin:
JACK_NO_START_SERVER=1 JACK_NO_AUDIO_RESERVATION=1 jalv -n floozy-poly https://danja.github.io/flues/plugins/floozy-poly

## Bluetooth MIDI

sudo apt install libudev-dev libical-dev libreadline-dev libdbus-1-dev libasound2-dev

https://www.bluez.org/download/
