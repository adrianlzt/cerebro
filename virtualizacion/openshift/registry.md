Registry público de RedHat
https://access.redhat.com/containers
Si nos bajamos una de estas imagenes en /root/build (o algo similar) tendremos los Dockerfile con los que se han construído.


https://github.com/runcom/skopeo
gestion de imagenes entre registries.


https://blog.openshift.com/getting-started-docker-registry/
https://docs.openshift.com/container-platform/3.3/dev_guide/managing_images.html#accessing-the-internal-registry

Tenemos que logearnos contra openshift.
Luego obtendremos un token que pasaremos al cliente docker para acceder al registro.
oc login
oc whoami -t
docker login -u NOMBREUSER -p XXX docker-registry-default.apps.openshift.inet

Ahora tageamos una imagen que tengamos en local para luego subirla al registry:
docker tag sha256:c713a 172.30.1.1:5000/sspeiche-test1/MyImage
docker push 172.30.1.1:5000/sspeiche-test1/MyImage


Para logearnos cuando el certificado no es válido:
- Copy the CA for those self-signed certificates and put it under /etc/pki/ca-trust/source/anchors/
- update-ca-trust extract
- Add an '--insecure-registry=<your-docker-registry-route>' option to the /etc/sysconfig/docker file.
- systemctl restart docker
https://access.redhat.com/solutions/1543893



Importar una imagen de hub.docker al registry de openshift:
oc import-image adriinflux:1 --from=docker pull adrianlzt/influxdb --confirm


Ver imágenes en el registry:
oc get is


# Acceso a registries externos con auth
https://docs.openshift.com/container-platform/latest/dev_guide/managing_images.html#allowing-pods-to-reference-images-from-other-secured-registries


# Bajar imagenes al registry interno
oc import-image my-dynatrace/oneagent --from=registry.connect.redhat.com/dynatrace/oneagent --confirm

