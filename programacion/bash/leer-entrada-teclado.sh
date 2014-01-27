read -p "Dime algo: " algo
echo "me has dicho $algo"


echo -n "dime algo: "
read algo
echo "me has dicho $algo"


# Valor por defecto 's'
echo -n "quieres seguir? [S/n]"
read seguir
seguir=${seguir:-s}
echo "seguir: $seguir"

if [ $seguir = "s" ]; then
	echo "seguimos"
else
	echo "no seguimos"
	exit
fi
