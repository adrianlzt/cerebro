# xsv
Escrita en rust

cat fichero.csv | xsv headers
  ver que columnas tiene, los nombres

cat fichero.csv | xsv table
  mostrar en formato tabla

cat problems.csv| xsv select host,name,severity | xsv sort
ordenar el csv y solo quedarnos con tres columnas

cat foo.csv | xsv slice -s 0 -e 5 | xsv select Title,Tags,CreationDate | xsv table
solo las primeras 5 líneas (sin contar el header), seleccionar unas columnas y mostrarlo como tabla




# csvkit
python

http://csvkit.readthedocs.io/en/0.5.0/index.html

pip install csvkit
pacman -S csvkit

mostrar columnas
cvscut -n fichero.csv
cvscut -c nombrecol,nombrecol2bis fichero.csv

csvstat foo.csv
analiza cada una de las columnas y nos da el tipo de dato, distribución, si contiene nulls, etc
