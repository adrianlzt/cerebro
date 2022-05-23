ts pone por cada línea el timestamp al comienzo.

tail -F fichero.log | ts

while true; do
df -h | grep home | ts
sleep 2
done
