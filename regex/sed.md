http://sed.sourceforge.net/grabbag/tutorials/sedfaq.txt
Manual: http://www.semicomplete.com/blog/articles/week-of-unix-tools/day-1-sed.html

Modificar fichero directamente con sed. Cambiar 127.0.0.1 por 0.0.0.0
sed -i 's/127.0.0.1/0.0.0.0/g' /etc/mysql/my.cnf


cat file | sed s/”cosa fea”/”cosa buena”/
cat file | sed s%”/cosas/con barras”%””%  #borramos /cosas/con/barras

echo ‘blackberry:$1$YctCf123456asdUwWnBl0:9081:9000:Usuario fabricante ftp KOSA:/KOSA-FTP/blackberry/:’ | sed 's@\(.*\)\(KOSA-FTP\).*@\1\2\/:@'
Con el \1 imprimimos todo lo que esté encerrado dentro del primer paréntesis


Agregar algo al final de una cadena:
echo "hostgroups=uno,dos,tres" | sed 's@\^(hostgroups=.*\)@\1,pepe@'


Modificar el mismo fichero que se edita:
sed -i s/cambiaesto/poresto/ fichero.txt

Para trabajar con el espacio en blaco -> \s
Ej:
retry_interval                  1               ; Schedule host check retries at 1 minute intervals
Queremos:
retry_interval                  1
s/\s*;.*$//


Del manual de semicomplete:

Grep like: sed -n '/palabra/s' /dir/file
Grep -v like: sed -n '/palabraQueNoQuiero/!p' /dir/file

Reusar partes:
$ echo "[1381467600] SERVICE STATE: CURRENT;icaro;processes;OK;HARD;1;" | sed "s/.*CURRENT;\([a-z]*\);.*/Ha dicho: \1/"
Ha dicho: icaro

Si queremos que el resto de la cadena se mantenga sin camios, y usar la pare macheada:
$ echo "[1381467600] SERVICE STATE: CURRENT;icaro;processes;OK;HARD;1;" | sed "s/;\([a-z]*\);/;XXX\1XXX;/"
[1381467600] SERVICE STATE: CURRENT;XXXicaroXXX;processes;OK;HARD;1;




### DUDAS ###
"[1381467600] SERVICE STATE: CURRENT;icaro;processes;OK;HARD;1;" -> quiero cambiar processes (segundo campo tras ';') por CMDprocesses

