https://github.com/etsy/supergrep
Parece que está discontinuado (ultimo commit Dic/12)

Supergrep is a web based log streamer written in node. It can be used quite nicely to surface new log lines (errors, etc.) that aren't normally expected.

Essentially, having supergrep running in your browser while changes are being made allows for new/novel log patterns to show up, because under the hood, what we're really doing is:

$ tail -f {log filename} | grep -v {stuff you'd expect to see in log lines}

It's intended on being a noise reduction and change-awareness tool.

La idea es usarla cuando se acaba de hacer un nuevo deploy para ver si algo raro pasa.



Instalación (nodejs > 0.8):
add-apt-repository ppa:chris-lea/node.js
apt-get install nodejs
git clone https://github.com/etsy/supergrep.git
cd supergrep
npm install
./runlocal

En el fichero de texto supergrep/localConfig.js definimos que ficheros vamos a mostrar
