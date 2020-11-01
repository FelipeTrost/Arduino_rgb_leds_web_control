# Arduino RGB LEDs web control

Simple program for controlling LED strips with single addressable LEDs with http requests.

### Note

For security, I use a key, which isn't really effective because HTTP requests aren't encrypted, so anybody could intercept the key. Still, for my intended use, it's good enough.

## Technologies

* Arduino (I used a nano, because of it's convenient size)
* ENC28J60 

## Libraries

* [NeoPatterns](https://learn.adafruit.com/multi-tasking-the-arduino-part-3/using-neopatterns), which is based on Neopixel. It allows the program to multitask.
* [EtherCard](https://github.com/njh/EtherCard)
