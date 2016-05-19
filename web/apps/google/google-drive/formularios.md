Crear formulario.

Rellenarlo desde el navegador capturando la peticion POST.

Debe quedar algo tipo:

curl 'https://docs.google.com/forms/d/XXXXXXXXXXXXXXXXXX/formResponse' -d 'entry.111111111111=VALOR'

r = requests.post("https://docs.google.com/forms/d/14fSvG8-akXAlgjc_U0pxrIV1ErL6Mnlz8wrwSSEGH98/formResponse", data={"entry.2053970454" :"www.manu
el.com"})

