for f in *
do
  echo "$f"
done


Bucle infinito
while :; do
  blabla
done


Bucle FOR con nombre con espacios en blanco
http://www.cyberciti.biz/tips/handling-filenames-with-spaces-in-bash.html

SAVEIFS=$IFS
IFS=$(echo -en "\n\b")
for f in *
do
  echo "$f"
done
IFS=$SAVEIFS


Más sencillo:
while read line           
do           
     echo $line           
done <file

while read line; do echo $line; done < file

while test `bitcoind -testnet getblockcount` -eq 50725; do sleep 10; echo yes; done

for i in {1..5}
do
   echo "Welcome $i times"
   done
