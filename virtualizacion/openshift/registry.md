Registry público de RedHat
https://access.redhat.com/containers
Si nos bajamos una de estas imagenes en /root/build (o algo similar) tendremos los Dockerfile con los que se han construído.


https://blog.openshift.com/getting-started-docker-registry/
https://docs.openshift.com/container-platform/3.3/dev_guide/managing_images.html#accessing-the-internal-registry

Tenemos que logearnos contra openshift.
Luego obtendremos un token que pasaremos al cliente docker para acceder al registro.
oc login
oc whoami -t
docker login -u developer -p XXX 172.30.1.1:5000

Ahora tageamos una imagen que tengamos en local para luego subirla al registry:
docker tag sha256:c713a 172.30.1.1:5000/sspeiche-test1/MyImage
docker push 172.30.1.1:5000/sspeiche-test1/MyImage




Importar una imagen de hub.docker al registry de openshift:
oc import-image adriinflux:1 --from=docker pull adrianlzt/influxdb --confirm


Ver imágenes en el registry:
oc get is
