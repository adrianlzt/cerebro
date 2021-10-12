# xsv
Escrita en rust

cat fichero.csv |  xsv table

 cat problems.csv| xsv select host,name,severity | xsv sort
 ordenar el csv y solo quedarnos con tres columnas



# cvskit
python

http://csvkit.readthedocs.io/en/0.5.0/index.html

pip install cvskit

mostrar columnas
cvscut -n fichero.csv
cvscut -c nombrecol,nombrecol2bis fichero.csv
