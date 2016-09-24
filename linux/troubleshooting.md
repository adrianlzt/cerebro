Cuando estamos ante un error raro de linux, cosas que suelen ser útiles mirar:

dmesg

SElinux activado? getenforce

Ver que no hay ningún fichero tocado a mano:
  En RHEL: yum verify
           rpm -V
  En Arch: sudo pacman -Qk > /dev/null
