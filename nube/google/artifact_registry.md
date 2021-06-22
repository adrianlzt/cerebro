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
