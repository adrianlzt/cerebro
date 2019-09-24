Manual: http://www.semicomplete.com/blog/articles/week-of-unix-tools/day-3-awk.html

$1 $2 $NF $NF-1, imprime la columna 1, 2, la última, la penúltima
$0 imprime toda la línea

awk '
BEGIN { printf "solo se hace al comienzo" }
cuerpo que se ejecuta una vez por cada línea
END { printf "solo al final" var }'

awk -v ORS="," '{print "pepe"};'
  ORS es lo que imprime el print al final, por defecto es \n


Imprimir el campo 7 si separamos mediante barras (/)
cat update_database  | awk '{FS="/"; print $7;}'
cat update_database  | awk -F "/" '{print $7;}'

Imprime primero la linea hasta el primer espacio en blanco, y seguido, el campo 7 si separamos por "/"
cat update_database  | awk '{printf $0} {FS="/"; printf ",%s\n",$7;}'

print mete automaticamente un cambio de linea.
printf no mete cambio de linea, hay que decirselo ("\n")


Trabajando con una variable que haga de contador:
cat update_database  | awk '{var+=1}{printf "1,%s",$0} {FS="/"; printf ",%s,%i\n",$7,var;}'


Substituir una fecha de un log en Unix Time to Epoch a fecha normal (puede no funcionar bien si hay otras fechas en mitad de linea)
echo "[1373855136] SERVICE ALERT: Tomcat2-live;Checkeo de Logs" | awk -F, '{x=$1;sub(/\[/,"",$1);sub(/.*]/,strftime("%Y-%m-%d %H:%M:%S",$1),x);$1=x;}1'


Convertir fecha normal a UNIX EPOCH:
echo "2013-10-02 14:12:45 | 3" | gawk '{
split($1, d, "-")
split($2, t, ":")
epoch = mktime(d[1] " " d[2] " " d[3] " " t[1] " " t[2] " " t[3])
print epoch, $4
}'
1380715965 3


echo "6/11/2016 17:30:36 5266683 2013 4545218" | gawk '{split($1, d, "/");split($2, t, ":");epoch = mktime(d[3] " " d[2] " " d[1] " " t[1] " " t[2] " " t[3]);print epoch " " $3 " " $4 " " $5}'


Sumar una columna
cat fichero | awk '{ SUM += $1} END { print SUM }'

Obtener el tamaño total (en GB) de una lista de ficheros:
{ for i in $(head files_uniq); do stat --format %s /export/user_assets/$i; done; } | awk '{ SUM += $1} END { print SUM/1024/1024/1024 }'

Una columna determinada y hacer un calculo al final:
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

Numero a entero
echo "5.2" | awk '{printf "%i", $1;}'


Random entre 0 y 1:
awk -v seed=$RANDOM 'BEGIN{srand(seed); print rand();}'


Quedarme con una linea:
cat fichero | awk 'NR==4'


Como grep:
echo "pattern" | awk '/pattern/'
awk '/a/ && /b/ && !/c/ && /d/'


Coger un valor de una columna de un fichero: grep + cut
awk '/processes/ {print $2}' /proc/stat
  De la linea que tiene "processes" coge la segunda columna


Convertir hex a int:
% echo "82 80 70 80 04" | awk $([[ $(awk --version) = GNU* ]] && echo --non-decimal-data) -F ' ' '
    BEGIN {OFS = FS}
    {
        $1 = sprintf("%d", "0x" $1)
        $2 = sprintf("%d", "0x" $2)
        $3 = sprintf("%d", "0x" $3)
        $4 = sprintf("%d", "0x" $4)
        $5 = sprintf("%d", "0x" $5)
        print
    }'
130 128 112 128 4



# Ejecutar comandos:
awk 'BEGIN{x=system("echo hello"); print x}'
  en x tendremos el return code

awk 'BEGIN{"date" |getline x; print x}'
  en x tendremos el contenido del stdout del comando


Numero random entre 0 y 1 (nunca será 1):
awk 'BEGIN { "date +%N" | getline seed; srand(seed); print rand(); }';


Imprimir todas las columnas menos la primera:
awk '{$1=""; print $0}'
