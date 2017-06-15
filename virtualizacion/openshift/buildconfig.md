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
source:
  git:
    uri: "https://github.com/openshift/ruby-hello-world"
    httpProxy: http://proxy.example.com
    httpsProxy: https://proxy.example.com
    noProxy: somedomain.com, otherdomain.com

