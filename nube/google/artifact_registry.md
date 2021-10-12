https://cloud.google.com/artifact-registry/docs

Para almacenar "artefactos".
Alpha (may'21): Maven, npm, PyPI, and APT repositories.
Artifact Registry Docker support is GA

Para la alpha hace falta rellenar un formulario para solicitar acceso.


Interfaz administrativa:
https://console.cloud.google.com/artifacts


# Docker
Configurar para poder hacer docker pull/push
gcloud auth configure-docker us-central1-docker.pkg.dev

docker push us-east1-docker.pkg.dev/PROJECTID/REPONAME/test:1


## Configurar docker en VMs
gcloud auth configure-docker us-central1-docker.pkg.dev

Mete el fichero:
/root/.docker/config.json
{
  "credHelpers": {
    "us-central1-docker.pkg.dev": "gcloud"
  }
}

## Configurar podman
gcloud auth print-access-token | podman login -u oauth2accesstoken --password-stdin https://us-east1-docker.pkg.dev

Credenciales en /run/containers/0/auth.json
No permanentes a propósito, para evitar dejar credenciales en la VM
https://bugzilla.redhat.com/show_bug.cgi?id=1697011


# apt / deb
https://cloud.google.com/artifact-registry/docs/os-packages/debian/apt-quickstart
https://cloud.google.com/artifact-registry/docs/os-packages/debian/configure#ubuntu-vm

consola web:


Listar repos:
gcloud artifacts repositories list


configurar un repo con apt
Hace falta instalar:

Para ubuntu:
echo 'deb http://packages.cloud.google.com/apt apt-transport-artifact-registry-stable main' | sudo tee -a /etc/apt/sources.list.d/artifact-registry.list
apt update
apt install -y apt-transport-artifact-registry

Configurar un repo en una debian/ubuntu:
echo 'deb ar+https://LOCATION-apt.pkg.dev/projects/PROJECT REPOSITORY main' | sudo tee -a /etc/apt/sources.list.d/artifact-registry.list

Hace falta las keys:
curl https://us-east1-apt.pkg.dev/doc/repo-signing-key.gpg | sudo apt-key add -
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -

Hace falta que la VM tenga permisos para acceder
https://cloud.google.com/artifact-registry/docs/access-control#compute
permiso "Artifact Registry Reader" a la service account de la vm

Tambien (la vm tiene que estar parada):
gcloud compute instances set-service-account INSTANCIA --scopes=cloud-platform --zone=us-east1-b



Subir .deb con gcloud
gcloud beta artifacts apt upload REPOSITORY --location=LOCATION --source=PACKAGES
  si nos da error probar con el alpha
gcloud alpha artifacts apt upload REPOSITORY --location=LOCATION --source=PACKAGES
