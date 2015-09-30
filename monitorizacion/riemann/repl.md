http://riemann.io/howto.html#connecting-to-the-repl

Meter en la config:
(repl-server {:host "127.0.0.1"})

Para conectar:
apt-get install leiningen
git clone git://github.com/aphyr/riemann.git
cd riemann
lein repl :connect 127.0.0.1:5557

No me funciona. Se intenta bajar dependencias pero no las encuentra.

# Comandos

Reload:
user=> (riemann.bin/reload!)
