Una vev check_mk ha generado el fichero para icinga1, vamos a extraer los datos para meterlos en icinga2 director.

Lista de hosts:
grep -B 3 address check_mk_objects.cfg | grep -e host_name -e address | awk '{print $2;}' | xargs -n 2 echo

Crear los hosts como:
icingacli director host create HOSTNAME --imports "Network Device" --address 10.0.0.5

Services por cada host:
grep -A 1 HOSTNAME check_mk_objects.cfg | grep service_description | awk '{$1=""; print $0;}' | sed "s/^ //"


Aplicar el template "Generic Passive" por cada check por cada host.
Agregar services a un host:
icingacli director service create "SERVICENAME" --host "HOSTNAME" --imports "Generic Passive"


HOSTNAME=SOMEHOST
SAVEIFS=$IFS
IFS=$(echo -en "\n\b")
for line in $(grep -A 1 $HOSTNAME check_mk_objects.cfg | grep service_description | awk '{$1=""; print $0;}' | sed "s/^ //"); do
icingacli director service create "$line" --host "$HOSTNAME" --imports "Generic Passive"
done
IFS=$SAVEIFS



Ahora tenemos que hacer que el service "Check_MK" llame al script en python.
Deberemos mover los scripts de python a /usr/lib64/nagios/plugins
cp -a /var/lib/check_mk/precompiled/*.py /usr/lib64/nagios/plugins/
chmod 755 /usr/lib64/nagios/plugins/*.py

Modifico a mano los services "Check_MK" para que sean activos y ejecuten ese check.
Hace falta tambien crear el command y un service asociado a este command.
El import del "Check_MK" apunta al service que apuntará al command.
Podria hacerse con la cli.
