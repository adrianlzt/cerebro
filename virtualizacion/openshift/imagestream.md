Parece que en el namespace/projecto openshift se almacenan imagenes ¿comunes?


Ver imagen streams:
oc get is


Detalle de un is:
oc describe is/perl


detalle de una imagen:
oc export isimage golang@sha256:29116f0f6cd2ef6a882639ee222ccb6e2f6d88a1d97d461aaf4c4a2622d252a1


Meter imagestreams desde un repo externo:
oc import-image pythonadri --confirm --from=docker.io/library/python
  podemos poner --all y parece que se baja las 5 últimas
  podemos especificar un tag determinado: oc import-image python:3.5.0 --confirm --from=docker.io/library/python:3.5.0 
  podemos ejecutar varias veces con distintas tags y se iran añadiendo


Si tenemos algun fallo en una imagen podemos bajarla de nuevo ejecutando el comando con los mismos parametros.



Ejemplo de declaración de una template de ImageStream
https://github.com/openshift/library/blob/master/community/python/imagestreams/python-centos7.json
