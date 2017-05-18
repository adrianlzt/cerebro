https://docs.openshift.com/container-platform/3.5/architecture/additional_concepts/scm.html

La integración de SCMs (por ahora solo git) con OpenShift se puede hacer de dos maneras:
  - que openshift consulte el repo periódicamente
  - con un webhook que avise a openshift de que se ha producido algún cambio

Una vez openshift tiene el cambio nuevo se ejecutará el BuildConfig asociado.
