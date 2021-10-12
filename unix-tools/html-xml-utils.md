Para xml es sencillo xq (similar a jq):
Sacar valores de un xml y pretty print
cat file.xml | xq .


https://github.com/ericchiang/pup
pup
Una especie de "jq" para html

$ curl -s https://news.ycombinator.com/ | pup 'table table tr:nth-last-of-type(n+2) td.title a'

cat respuesta.html| pup 'json{}'


Utilidades para parsear html

http://www.w3.org/Tools/HTML-XML-utils/README

Mirar con python:
programacion/python/beautifulsoup.md



http://developerblog.redhat.com/2013/12/05/xml-editing-bash-script/


Arch: pacman -S libxslt


Más sencillo: xmlstar
http://xmlstar.sourceforge.net/doc/UG/xmlstarlet-ug.html#idm47077139594320
Arch: pacman -S community/xmlstarlet



xml sel -t -c '/cruise/pipelines [@group="ORG-DEV"]' cruise-config.xml
Busca el fichero cruise-config.xml
  <pipelines group="ORG-DEV">

-i or --insert, mete antes del xpath
-a or --append, mete despues del xpath
-s or --subnode, mete dentro del xpath



$ cat test.xml 
<rootnode>
  <element-a />
  <element group="b">
    <params>
      <param name="pepeito"></param>
    </params>
  </element>
  <element group="d"/>
  <element-e />
</rootnode>

$ xml ed -s "/rootnode/element[@group='b']" -t elem -n element-c -v "asd" test.xml 
<?xml version="1.0"?>
<rootnode>
  <element-a/>
  <element group="b">
    <params>
      <param name="pepeito"/>
    </params>
    <element-c>asd</element-c>
  </element>
  <element group="d"/>
  <element-e/>
</rootnode>



xml ed -s "/cruise/pipelines[@group='ORG-DEV']" -t elem -n "pipeline" cruise-config.xml |
 xml ed -s "//pipeline[not(@name)]" -t attr -n name -v "reponombre-adritest" |
 xml ed -s '//pipeline[@name="reponombre-adritest"]' -t attr -n template -v "python_rpm" |
 xml ed -s '//pipeline[@name="reponombre-adritest"]' -t elem -n materials -v '' |
 xml ed -s '//pipeline[@name="reponombre-adritest"]/materials' -t elem -n git |
 xml ed -s '//pipeline[@name="reponombre-adritest"]/materials/git' -t attr -n url -v "git@github.com:reponombre/reponombre-testadri.git" |
 xml ed -s '//pipeline[@name="reponombre-adritest"]/materials/git' -t attr -n branch -v "develop"

Convierte
<cruise ...>
  <pipelines group="ORG-DEV">
    <pipeline name="reponombre-icinga-staled" template="python_rpm">
      <materials>
        <git url="git@github.com:reponombre/reponombre-icinga-staled.git" branch="develop" />
      </materials>
    </pipeline>
  </pipelines>
</cruise>

En

<cruise ...>
  <pipelines group="ORG-DEV">
    <pipeline name="reponombre-icinga-staled" template="python_rpm">
      <materials>
        <git url="git@github.com:reponombre/reponombre-icinga-staled.git" branch="develop" />
      </materials>
    </pipeline>
    <pipeline name="reponombre-adritest" template="python_rpm">
      <materials>
        <git url="git@github.com:reponombre/reponombre-testadri.git" branch="develop"/>
      </materials>
    </pipeline>
  </pipelines>
</cruise>


