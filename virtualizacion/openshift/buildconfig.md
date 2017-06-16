https://docs.openshift.com/container-platform/3.5/dev_guide/builds/index.html

Seccion del template donde se define de donde se va a sacar el código y como se va a construir la imagen que usaremos.

Típicamente usaremos una imagen base (ej: python) y apuntaremosa un repositorio Git.

# Build strategies
Source-to-Image (S2I) (description, options)

Pipeline (description, options)

Docker (description, options)

Custom (description, options)


# Sources
Git

Dockerfile

Binary

Image

Input secrets

External artifacts



# Repositorio git con proxy
https://docs.openshift.com/container-platform/3.5/dev_guide/builds/build_inputs.html#using-a-proxy-for-git-cloning

source:
  git:
    uri: "https://github.com/openshift/ruby-hello-world"
    httpProxy: http://proxy.example.com
    httpsProxy: https://proxy.example.com
    noProxy: somedomain.com, otherdomain.com


# Acceso para clonar repos
https://docs.openshift.com/container-platform/3.5/dev_guide/builds/build_inputs.html#source-clone-secrets

Para que el pod de build pueda bajarse los repos puede necesitar credenciales.
Las credenciales generalemnte userán basic auth o una clave ssh.

Crearemos secrets para almacenar esta información.
La relación entre que secret usar para que dominio se hará mediante annotations o directemente entre el buildconfig y el secret

Directamente (o en la web, config de la bc, advanced):
oc set build-secret --source bc/sample-build basicsecret


Mediante annotations (el secret deberá existir antes de crearse el buildconfig para que se aplique):
oc secrets new-basicauth <secret_name> --username=<user_name> --password=<password>
oc annotate secret <secret_name> 'build.openshift.io/source-secret-match-uri-1=https://*.mycorp.com/*'

Con la interfaz web:
primero crearemos el secret
luego iremos a su web y editaremos el yaml agregando una o varias annotations:
kind: Secret
apiVersion: v1
metadata:
  name: override-for-my-dev-servers-https-only
  annotations:
    build.openshift.io/source-secret-match-uri-1: https://mydev1.mycorp.com/*
    build.openshift.io/source-secret-match-uri-2: https://mydev2.mycorp.com/*


Tal vez tambien tengamos que meter una ca específica.
Con oc sería agregar: --ca-cert=<path/to/file> al crear el secret

Otra opción es crear un secret con el parametro ca.crt y meter ahi el cert:
oc secrets new iseeucatid ca.crt=/fichero/ca.crt

En el yml estó se pondrá (no me queda muy claro que pone, porque no es el texto que aparece en el .pem):
data:
  ca.crt: >-
    c4Bf54sdG56...


O si el certificado no es válido pero queremos aceptarlo:
oc set env bc/django-psql-persistent GIT_SSL_NO_VERIFY=true
