https://github.com/DmitryKey/luke
https://www.paypal-engineering.com/2016/08/10/powering-transactions-search-with-elastic-learnings-from-the-field/

Luke is the GUI tool for introspecting your Lucene / Solr / Elasticsearch index. It allows:
  Viewing your documents and analyzing their field contents (for stored fields)
  Searching in the index
  Performing index maintenance: index health checking, index optimization (take a backup before running this!)
  Testing your custom Lucene analyzers

# Install
Dependencias: java-openjfx
  Arch linux: pacman -S java-openjfx

Bajarse la release que matchee el Lucene que esté usando la version de ES que queramos
https://github.com/DmitryKey/luke/releases
unzip *.zip
cd luke*

./luke.sh



Codigo (me fallan las deps, creo que porque no tenia openjfx instalado)
git clone https://github.com/DmitryKey/luke.git
cd luke
mvn install



# Elasticsearch
Tendremos que apuntar Luke al directorio del indice que queremos (podemos consultar el ID del índice con GET _cat/indices/nombre)
Ej.: /usr/share/elasticsearch/data/nodes/0/indices/Us5BO1SoRbCaSHIamKrstw

Para que Luke pueda funcionar los segmentos tienen que haber sido commiteados.
Podemos ver el estado (commiteado a disco o no) con:
GET _cat/segments/nombreindice?v
Forzar flush/commit (no hacer en prod!):
POST my_refresh_test/_flush
