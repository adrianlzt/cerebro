Listar paquetes instalados
swlist -v


Buscar a que paquete pertenece un fichero
swlist -l file | grep fichero
  cuidado con los enlaces simbolicos, tendremos que buscar el nombre del fichero real
  cuidado tambien si buscamos con path completo y en el path hay algun link simbolico

Otra forma (menos gasto de recursos):
find /var/adm/sw/products -name INFO -exec grep -i NAME +


Parece que el software se instala en
/var/adm/sw/products/
