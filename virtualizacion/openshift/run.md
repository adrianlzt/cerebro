oc run prueba --rm=true -it --image=centos
oc run prueba --rm=true -it --image=centos curl google.es
oc run prueba --rm=true -it --image=centos -- curl -v google.es
oc run prueba5 --rm=true -it --image=centos echo $(hostname)
  hará echo del hostname del nodo que lanza el comando oc




oc run prueba --rm=true -it --image=centos "curl google.es"
  esto no funciona. Arrancará el container pero no se podrá unir. Pondra que no esta ready



Si queremos modificar el entrypoint
oc run prueba-cyclops3 -it --image=dockerhub.hi.inet/dsmctools/cyclops-agent:basic --command /bin/bash
