Cuando estamos ante un error raro de linux, cosas que suelen ser útiles mirar:

dmesg

SElinux activado? getenforce

Ver que no hay ningún fichero tocado a mano:
  En RHEL: yum verify
           rpm -V
  En Arch: sudo pacman -Qk > /dev/null

Algún agente de seguridad instalado?
En un caso era un agente (ds_agent, de Trend micro), que tiraba los paquetes por hacer match en una de las reglas que tenía configurada.

Las fechas del sistema están bien?
Tenemos ficheros en el futuro?
