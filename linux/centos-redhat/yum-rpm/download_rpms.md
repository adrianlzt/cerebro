http://www.cyberciti.biz/faq/yum-downloadonly-plugin/

yum -y install yum-utils.noarch
yumdownloader Paquete
  Lo baja en el directorio actual.
  Si hay varias versiones nos baja todas.


Para bajar el .src.rpm
yumdownloader --source paquete
