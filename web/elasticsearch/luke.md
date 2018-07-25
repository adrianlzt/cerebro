https://github.com/DmitryKey/luke
https://www.paypal-engineering.com/2016/08/10/powering-transactions-search-with-elastic-learnings-from-the-field/

Luke is the GUI tool for introspecting your Lucene / Solr / Elasticsearch index. It allows:
  Viewing your documents and analyzing their field contents (for stored fields)
  Searching in the index
  Performing index maintenance: index health checking, index optimization (take a backup before running this!)
  Testing your custom Lucene analyzers

# Install
Bajarse la release que matchee el Lucene que esté usando la version de ES que queramos
https://github.com/DmitryKey/luke/releases
unzip *.zip
cd luke*

Deps arch:
pacman -S java-openjfx

./luke.sh



Codigo (me fallan las deps)
git clone https://github.com/DmitryKey/luke.git
cd luke
mvn install
