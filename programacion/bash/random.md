Número 0 o 1: $[ ($RANDOM % 2) ]
Número entre 1 y 10: $[ ($RANDOM % 10) +1 ]

numero=$[($RANDOM %4)]
if [ $numero -eq 1 ]; then
        echo "1 sacado"
elif [ $numero -eq 2 ]; then
        echo "numero 2"
elif [ $numero -eq 3 ]; then
        echo "numero 3"
else   
        echo "0 sacado"
fi


Cadena alfanumerica de 32 caracteres
cat /dev/urandom | tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1
