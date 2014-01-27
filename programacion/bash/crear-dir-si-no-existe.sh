var="/tmp/prueba"
if [ -d "$var" ]; then
	echo "$var ya existe"
else
	echo "creamos $var"
	mkdir $var
fi
