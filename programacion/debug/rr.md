# deterministic debugging
Grabar una sesión de ejecución del programa y luego poder hacer replay.

VM recording (necesitas una vm que lo soporte; mucho overhead):
 ReVirt
 VMware Workstation (descontinuado)
 Simics

User space:
  UndoDB
  TotalView ReplayEngine
  Mozilla RR <-- mejor solución ahora mismo

# rr
http://rr-project.org/

You record a failure once, then debug the recording, deterministically, as many times as you want. The same execution is replayed every time.

Hay que lograr elimiar las fuentes no deterministicas que podamos controlar.
  ciertas instrucciones de CPU (random por ejemplo), se puede patchear
  ciertas cosas de tiempo (se pueden grabar y hacer replay)
  thread scheduling, para solucionarlo corre single threaded
  syscalls, se almacenan y se hace replay
  memory layout, debe mantenerse para que la reproducción sea exacta
  shared memory, como corre singles threaded no hay mucho problema
  signal handling, se almacenan y replay

Fuentes que no controlamos:
  kernel (pero almacenamos las respuestas que nos interesan)
  hardware failures, nada que podamos hacer

Pros:
  low overhead
  puede reproducir bugs
  puede ir hacia adelante o atrás (reverse)

Cons:
  ...

## Install / compile
Deps:
 pacman -S capnproto

git clone https://github.com/mozilla/rr.git
mkdir obj && cd obj
cmake ../rr
make -j8
sudo make install

/usr/local/share/rr
/usr/local/lib/rr/
/usr/local/bin/rr
/usr/local/bin/signal-rr-recording.sh
/usr/local/bin/rr-collect-symbols.py



$ rr record /your/application --args
...
FAIL: oh no!


$ rr replay
GNU gdb (GDB) ...
...
0x4cee2050 in _start () from /lib/ld-linux.so.2
(gdb)

