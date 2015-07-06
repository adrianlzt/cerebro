Manual: http://www.semicomplete.com/blog/articles/week-of-unix-tools/day-3-awk.html

$1 $2 $NF $NF-1, imprime la columna 1, 2, la última, la penúltima
$0 imprime toda la línea

awk '
BEGIN { printf "solo se hace al comienzo" }
cuerpo que se ejecuta una vez por cada línea
END { printf "solo al final" var }'


Imprimir el campo 7 si separamos mediante barras (/)
cat update_database  | awk '{FS="/"; print $7;}'
cat update_database  | awk -F "/" '{print $7;}'

Imprime primero la linea hasta el primer espacio en blanco, y seguido, el campo 7 si separamos por "/"
cat update_database  | awk '{printf $0} {FS="/"; printf ",%s\n",$7;}'

print mete automaticamente un cambio de linea.
printf no mete cambio de linea, hay que decirselo ("\n")


Trabajando con una variable que haga de contador:
cat update_database  | awk '{var+=1}{printf "1,%s",$0} {FS="/"; printf ",%s,%i\n",$7,var;}'


Substituir una fecha de un log en Unix Time to Epoch a fecha normal
echo "[1373855136] SERVICE ALERT: Tomcat2-live;Checkeo de Logs" | awk -F, '{x=$1;sub(/\[/,"",$1);sub(/.*]/,strftime("%Y-%m-%d %H:%M:%S",$1),x);$1=x;}1'


Convertir fecha normal a UNIX EPOCH:
echo "2013-10-02 14:12:45 | 3" | gawk '{
split($1, d, "-")
split($2, t, ":")
epoch = mktime(d[1] " " d[2] " " d[3] " " t[1] " " t[2] " " t[3])
print epoch, $4
}'
1380715965 3


Sumar una columna
ls -lh php*; ls -l php* | awk '{ SUM += $5} END { print SUM/1024/1024 }'

echo -e "1\n2\n3\n6" | awk '{var+=$1} END {print var}'


Dos columnas, una con créditos y otra con la nota. Queremos la media, calculada como SUM(nota*cred)/SUM(cred)
cat creditos_notas.txt | awk '{NOTACRED += $1*$2; CRED += $1} END {print NOTACRED/CRED}'


AWK sin input:
awk "BEGIN {printf \"${BASH}\";}"


Mates, en el man hay un monton de funciones matemáticas: 
awk "BEGIN {printf \"%.2f\",${TIME_WAIT}/${TOTAL}}"


Imprimir variables de entorno:
print ENVIRON["file"]


Division:
$ awk "BEGIN {print 5/2}"
2.5


Random entre 0 y 1:
awk -v seed=$RANDOM 'BEGIN{srand(seed); print rand();}'

