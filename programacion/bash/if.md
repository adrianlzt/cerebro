Formato nuevo:
if [[ $var = img* && ($var = *.png || $var = *.jpg) ]]; then
        echo "$var starts with img and ends with .jpg or .png"
fi

Formato antiguo:
http://www.linux-es.org/node/238
if "condicion"
then
  "comandos"
[elif "condicion"
then
  "comandos"]
[else
  "comandos"]
fi
