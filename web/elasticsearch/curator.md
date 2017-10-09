https://www.elastic.co/guide/en/elasticsearch/client/curator/current/index.html

Generalmente usado para borrar indices antiguos.
/usr/bin/curator delete indices --older-than 30 --time-unit days

Por defecto seleccionará los índices a borrar esperando que al final del nombren tenga el formato de fecha: YYYY.MM.DD


Puede hacer más cosas:
https://www.elastic.co/guide/en/elasticsearch/client/curator/current/about-features.html
