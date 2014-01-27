http://devstructure.com/blueprint/

Blueprint is a simple configuration management tool that reverse-engineers servers. It figures out what you’ve done manually, stores it locally in a Git repository, generates code that’s able to recreate your efforts, and helps you deploy those changes to production.

Requisitos:
Python >= 2.6
Git >= 1.7

Instalacion debian-like, ubutun 12.04 LTS (preciseudo apt-get -y install blueprint
:
echo "deb http://packages.devstructure.com $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/devstructure.list
sudo wget -O /etc/apt/trusted.gpg.d/devstructure.gpg http://packages.devstructure.com/keyring.gpg
sudo apt-get update
sudo apt-get -y install blueprint

También hay paquetes para RHEL/CentOS o via pip.


Sigo el ejemplo de la doc.
Instalo nginx y sinatra (ruby web server) entre otros.
Creo una mini aplicación

Una vez todo configurado crearemos la blueprint:
sudo blueprint create example

Estas se almacenan en:
/root/.blueprints.git


Podemos ver lo que se ha hecho con:
blueprint-show NOMBRE

Los ficheros que se han guardado con:
blueprint-show-files NOMBRE

Los paquetes de los distintos gestores que se han instalado
blueprint-show-packages NOMBRE

Servicios arrancados por sysvinit o upstart
blueprint-show-services NOMBRE

Instalaciones a partir de código (.tar.gz, etc)
blueprint-show-sources NOMBRE


Una vez generado el blueprint, podemos usar blueprintignore para quitar ciertas cosas que no queremos.
Por ejemplo, el blueprint puede habernos detectado paquetes que no queremos que vayan en dicho blueprint, o ficheros locales, de instalación, servicios, etc
Se pueden configurar en:
/etc/blueprintignore
y en 
~/.blueprintignore

Ejemplo de cosas que sacamos:
/etc/apt/sources.list
/etc/hosts
/etc/mysql/debian.cnf
/etc/nginx/sites-enabled/default
package:apt/build-essential
!:package:apt/build-essential
:package:apt/ruby
!:package:apt/ruby
:package:apt/ruby-dev
!:package:apt/ruby-dev

Si ignoramos un paquete, se borran todas sus dependencias.
Si lo uningnoramos, borramos el paquete, pero se quedan sus dependencias (es asi??)


Tambien podemos crear una regla de lo que queremos que se meta en la blueprint, y asi no analizar todo el sistema:
Para esto nos daremos una vuelta por todo lo que mete al principio: blueprint-show-* y decidiremos con que nos quedamos.
$ vi example.blueprint-rules
:source:/usr/local
/etc/init/example.conf
/etc/nginx/sites-*/example
:package:apt/libmysqlclient-dev
:package:apt/mysql-client-5.1
:package:apt/nginx-common
:package:apt/nginx-light
:package:apt/ruby-dev
:package:apt/rubygems
:package:rubygems/*
:service:sysvinit/nginx
:service:upstart/example

Aplicamos la regla, y asi el example ya se nos queda ya listo.
blueprint rules example.blueprint-rules


Otras herramientas útiles para partir, unir, sacar diffs de blueprints:

blueprint diff minuend subtrahend difference
Resources that appear in minuend but not subtrahend will be included in difference and committed to the local Git repository under that name.

blueprint-split prints each resource in src and prompts you for a choice of dest-a or dest-b. The resulting dest-a and dest-b blueprints are committed to the local Git repository.
blueprint split src dest-a dest-b

blueprint-prune instead prompts you to include or ignore each resource in src in dest.
blueprint prune src dest


# Templates
Podemos hacer que los archivos de configuración tengan templates, creando un fichero que se llame igual, pero terminando en .blueprint-template.mustache o en .blueprint-template.sh (en este último caso exportaremos variables que la recogeremos con el .moustache)

# Deploy
Para lanzar un deploy en una máquina que tenga blueprint:
blueprint-apply NOMBRE  (es equivalente a blueprint show -S nombre | sh)

Para generar un script en bash con el deploy del blueprint (lo mete en example/bootstrap.sh. Tendremos que copiar ese directorio entero a la máquina donde queramos hacer el deploy, ya que en ese directorio esta el .tar con los ficheros):
blueprint show -S NOMBRE

Para generar un puppet:
blueprint show -P NOMBRE

Para chef:
blueprint show -C NOMBRE


# Servidor - http://devstructure.com/blueprint/#server
blueprint tambien nos instala un servidor (apagado en principio) donde podemos hacer push y pull de los blueprints que vayamos creando.
Dependencias:
pip install boto flask gunicorn

# Git
Al final todo está almacenado en git. Podemos pasar comandos git con
blueprint git CMD

Ej. ver las diferencias entre las dos ultimas versiones de un blueprint
blueprint git show example


#ToDo
Un comando que te saque todos los ficheros, packages y servicios en el estilo que luego lo requiere el rules, o el ignore
Autocompletar los nombres de los proyectos

blueprint-split: parametro para poder definir uno por defecto, y que valga '1' o '2' para el primero o el segundo.

blueprint-prune: dar la posibilidad de poner un comando por defecto


#Dudas
como hace lo de "Controlling service restart conditions" ??

El bootstrap no me ha funcionado bien, porque le falta el script de init
Tambien ha fallado que no me ha instalado el /etc/unicorn.conf.rb
