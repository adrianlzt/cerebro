https://maas.ubuntu.com/docs/troubleshooting.html

Acceder a una ephemeral image, añadir un login:
sudo apt-get install --assume-yes bzr
bzr branch lp:~maas-maintainers/maas/backdoor-image backdoor-image

imgs=$(echo /var/lib/maas/boot-resources/*/*/*/*/*/*/root-image)
for img in $imgs; do
    [ -f "$img.dist" ] || sudo cp -a --sparse=always $img $img.dist
done

for img in $imgs; do
    sudo ./backdoor-image/backdoor-image -v --user=backdoor --password-auth --password=ubuntu $img
done

Lo que hace es montar la imagen (con backdoor-image/mount-callback-umount) en un directorio temporal, luego modifica los ficheros y desmonta.


sudo ./backdoor-image/backdoor-image --dry-run -v --user=backdoor --password-auth --password=ubuntu $img
  Para mostrar que hacer pero no cambiar nada.


Nos creará un usuario 'backdoor' con password 'ubuntu'



# Otra opcion
Bloquear el acceso a la API cuando está ejecutando los scripts de enlisment:
iptables -A INPUT -i eth1 -p tcp --dport 80 -s 192.168.1.205 -j DROP

Al no poder registrarse, nos abrirá una shell.
Tardará 4' en abrirla porque esperará dos timeouts de 2'
