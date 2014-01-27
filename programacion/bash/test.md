Usar el nuevo formato:
http://mywiki.wooledge.org/BashFAQ/031

Multiples condiciones:
if [[ $var = img* && ($var = *.png || $var = *.jpg) ]]; then
	echo "$var starts with img and ends with .jpg or .png"
fi


FORMATO ANTIGUO:
Comprobar si una variable ha sido definida:
id=$(cmd);
if [ -n "$id" ]; then
        echo "id=$id"
else   
        echo "no definida"
fi

Comprobar si dos cadenas con iguales:
if [ $var = "cosa" ]; then
	echo "iguales"
fi


