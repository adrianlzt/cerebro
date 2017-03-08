Para firmar documentos:
http://forja-ctt.administracionelectronica.gob.es/web/clienteafirma


Chequear que nuestro navegador es compatible:
https://sedeapl.dgt.gob.es/WEB_PADI/

Usar firefox con java y javascript.

Con linux no me ha funcionado, no detecta el certificado instalado en firefox.




# AutoFirma
Bajar el .deb de aqui http://firmaelectronica.gob.es/Home/Descargas.html

Descomprimirlo.
Ejecutar:
java -jar ./lib/AutoFirma/AutoFirmaConfigurador.jar

Instalar ./lib/AutoFirma/autofirma.pfx en el Chrome

Entrar en la web que nos pida firmar.
Al darle a firmar nos deberia preguntar si queremos abrir el xdg-open
Al darle que si nos abre el navegador firefox con el link de lo que debemos firmar.
Algo tipo:
afirma://service?ports=60815,61837,58229&v=1&idsession=YNp5Jhi7zubGFNmI

Arrancaremos rapidamente AutoFirma pasandole esa uri:
java -jar lib/AutoFirma/AutoFirma.jar "afirma://service?ports=49720,53516,64670&v=1&idsession=97PotLZ8WMB07HY"

Este jar levantará un puerto al que se conectara el JS del navegador para firmar. Nos preguntará que certificado queremos utilizar (deberá estar en el navegador metido)
