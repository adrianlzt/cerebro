https://docs.openshift.com/container-platform/3.5/architecture/additional_concepts/scm.html

La integración de SCMs (por ahora solo git) con OpenShift se puede hacer de dos maneras:
  - que openshift consulte el repo periódicamente
  - con un webhook que avise a openshift de que se ha producido algún cambio

Una vez openshift tiene el cambio nuevo se ejecutará el BuildConfig asociado.


# BuildConfig source

## Proxy
git: {
  uri: https://git.inet/tools/tools-openshift,
  httpsProxy : http://proxy.inet:6666,
  ref: master
},

## Omitir chequeo cert ssl
strategy: {
  type: Source,
  sourceStrategy: {
    from: {
      kind: ImageStreamTag,
      namespace: openshift,
      name: python:3.5
    },
    env: [
      {
        name: GIT_SSL_NO_VERIFY,
        "value": "true"
      }

## Auth
https://docs.openshift.com/enterprise/3.1/dev_guide/builds.html#basic-authentication

oc secrets new-basicauth basicsecret --username=USERNAME --password=PASSWORD

  source:
    git:
      uri: "https://github.com/user/app.git" 
    sourceSecret:
      name: "basicsecret"
    type: "Git"



Agregar un secret que se aplicará automáticamente a todas las urls de git que cumplan un patrón:
https://docs.openshift.com/container-platform/3.5/dev_guide/builds/build_inputs.html#automatic-addition-of-a-source-secret-to-a-build-configuration

Para que funcione el secret debe estar creando antes de crear la app.

Se trata de crear un secret y luego meterle unas annotations diciendo que schema de URI matcheara contra estas credenciales.
