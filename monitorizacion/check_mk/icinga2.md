Una vev check_mk ha generado el fichero para icinga1, vamos a extraer los datos para meterlos en icinga2 director.

Lista de hosts:
grep -B 3 address check_mk_objects.cfg | grep -e host_name -e address | awk '{print $2;}' | xargs -n 2 echo

Services por cada host:
grep -A 1 sw1.usync.us check_mk_objects.cfg | grep service_description | awk '{$1=""; print $0;}' | sed "s/^ //"
