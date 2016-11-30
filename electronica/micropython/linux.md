https://github.com/micropython/micropython/wiki/Getting-Started
Version del micropython para probar en linux

yaourt -S micropython


# Desde el git
git clone git@github.com:micropython/micropython.git
cd micropython
git submodule update --init
cd unix
make axtls
./micropython
MicroPython v1.8.6-63-gc28fed6 on 2016-11-18; linux version
Use Ctrl-D to exit, Ctrl-E for paste mode
>>>
