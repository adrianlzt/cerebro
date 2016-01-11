for f in *
do
  echo "$f"
done

for i in dsmc_pp dsmc_prod dsn_pp dsn_prod; do cd $i; git status; cd ..; done

for i in `cat duplicados`; do cat <<-EOF
UPDATE tbl_contactgroup SET config_id=(select id from tbl_datadomain where domain = "$i") WHERE contactgroup_name = "$i";
EOF
done



Bucle infinito (tambien: while true; do)
while :; do
  blabla
done


Bucle FOR con nombre con espacios en blanco
http://www.cyberciti.biz/tips/handling-filenames-with-spaces-in-bash.html

En este caso se pasara $f como un solo parametro
SAVEIFS=$IFS
IFS=$(echo -en "\n\b")
for f in *; do
 echo "$f"
done
IFS=$SAVEIFS


Más sencillo (en este caso, si la linea tiene espacios en blanco, cada uno será un parametro):
while read line           
do           
     echo $line           
done <file

while read line; do echo $line; done < file

while test `bitcoind -testnet getblockcount` -eq 50725; do sleep 10; echo yes; done

for i in {1..5}; do
   echo "Welcome $i times"
done

for i in $(seq 1 5); do
   echo "Welcome $i times"
done

seq 0 6 240
de 0 a 240 en incrementos de 6 en 6

seq -f "%02g" 0 6 240
padding with zeroes


http://www.tldp.org/LDP/Bash-Beginners-Guide/html/sect_09_05.html
break -> para salir del bucle
continue -> para ir a la siguiente iteración del bucle

Bucle para ir esperando cada vez más: 0.1s, 0.2s, ..., 1.5s
for i in 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15; do printf "."; sleep $(echo $i | awk '{printf "%.2f \n", $1/10}'); done



Bucle escribiendo array:
for (( i=1; i <= 3; ++i ))
do
  host[$i]="pepe"
  echo "Valor: ${host_gb[$i]}"
done
