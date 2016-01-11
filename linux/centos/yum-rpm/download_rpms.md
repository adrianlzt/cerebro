http://www.cyberciti.biz/faq/yum-downloadonly-plugin/

yum -y install yum-utils.noarch
yumdownloader Paquete
  Lo baja en el directorio actual.
  Si hay varias versiones nos baja todas.

  --resolve
    baja dependencias
  --urls
    muestra que va a bajar, pero no baja nada


Para bajar el .src.rpm
yumdownloader --source paquete
