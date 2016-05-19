Extraemos la lista de todas los colectores por cada medida
influx -username admin -password ZZZZ -database iot -execute 'show tag values with key= "collector"' > colectores

Filtramos para solo quedarnos aquellas medidas que tienen el colector XXX
cat colectores | egrep -e "^name" -e XXX | grep -B 1 XXX | grep name | cut -d ' ' -f 2 > colectores_malos


Borramos esas entradas
for i in $(cat colectores_malos); do
influx -username admin -password ZZZZ -database iot -execute "DROP SERIES FROM $i where collector = 'XXX'"
done
