# Virtualizar sobre libvirt
Lo pongo con una configuracion para Linux, Ubuntu 12.04LTS
3GB para el dev mode
Sin discos extras al comienzo

Si al arrancar la web aparece en blanco, hacer el touch del fichero devmode y reiniciar


# Meter password
Si estamos arrancando desde libvirt
Cuando este cargando, presionar escape para entrar en el menu de conf de grub, entrar como rescue mode, dar password al usuario admin y quitar la limitacion de no poder entrar con password por ssh.



# Saltando los preflight checks


touch /etc/github/devmode

vi /usr/local/share/enterprise/ghe-preflight-check
  buscar "CHECK_REQUIREMENTS = {" y en "dev" bajar la memory a 0

Si estamos en aws, para que nos deje usar cualquier instancia:
rm /etc/github/ec2-ami


vi /usr/local/share/enterprise/systemd-scripts/ghe-user-disk-start
  buscar cuando llama a mountpoint y cambiarlo por /bin/true

Algunas modificaciones tambien en ghe-storage-init, borrando todo un if-else para que no intente crear nada de lvs, pero dejando el final donde crea directorios.


Tras comprobar que /usr/local/share/enterprise/systemd-scripts/ghe-user-disk-start se ejecuta bien, reiniciar el servicio en systemctl para que continue la carga:
systemctl restart ghe-user-disk.service


Ahora tenemos que meter la licencia.
Leyendo el contenido de la licencia:
gpg --skip-verify --no-permission-warning --decrypt github-enterprise.ghl 2>/dev/null | tar xO metadata.json | python -m json.tool



# Pre-receive hooks

Los hooks se ejecutan en un entorno muy capado.
Si queremos un entorno con mas cosas (python, git, etc) tendremos que crear un docker como explican aqui:
https://help.github.com/enterprise/2.8/admin/guides/developer-workflow/creating-a-pre-receive-hook-environment/

Subiremos ese docker como environment y luego podremos correr ahi nuestro script pre-receive
