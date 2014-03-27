http://docs.docker.io/en/latest/use/puppet/
https://github.com/garethr/garethr-docker
http://www.slideshare.net/jpetazzo/docker-and-puppet-puppet-camp-la-scale12x

Instalar puppet en una máquina y ejecutar imágenes en ella.


Mirar en devops/puppet/docker.pp para como instalar docker, bajar una imagen y provisionarla con puppet.



También podemos instalar puppet en los containers, ejecutarlos, y correr puppet.
"Slower to deploy, uses more resources", que un Dockerfile
El agente de puppet es muy "grande" para correr en un container.

Otra opción mejor. En el dockerfile instalar puppet, y ejecutar puppet!
De esta manera tenemos la imagen generada ya configurada como quiere puppet.
Faster to deploy. Easier to rollback
Esto es usar puppet como herramienta de deploy, pero no de configuration management.
No podemos cambiar los containers ya desplegados.
Dockerfile:
  coger repos de puppetlabs
  apt-get update -q
  apt-get install -qy puppet-common
  ENV FACTER_HOSTNAME blabla
  ADD ./site.pp /puppet/site.pp
  RUN puppet apply site.pp
