read -p "Dime algo: " algo
echo "me has dicho $algo"


echo -n "dime algo: "
read algo
echo "me has dicho $algo"


# Valor por defecto 's'
echo -n "quieres seguir? [S/n] "
read seguir
seguir=${seguir:-s}
echo "seguir: $seguir"

if [[ $seguir =~ [sS] ]]; then
        echo "seguimos"
else
        echo "no seguimos"
        exit
fi



read -s var
  para esconder lo que se escribe, por ejemplo si pedimos una contaseña
