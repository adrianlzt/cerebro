http://rr-project.org/

You record a failure once, then debug the recording, deterministically, as many times as you want. The same execution is replayed every time.


$ rr record /your/application --args
...
FAIL: oh no!


$ rr replay
GNU gdb (GDB) ...
...
0x4cee2050 in _start () from /lib/ld-linux.so.2
(gdb)

