Se puede poner como array json, o simplemente separado por espacios:
VOLUME ["/var/log/", "/opt/bla"]
VOLUME "/var/log/" "/opt/bla"


No debemos dejar ficheros en un VOLUME, ya que en la siguiente ejecución no existirá.

Ejemplo:
FROM alpine
RUN mkdir -p /foo/bar
VOLUME /foo/bar
RUN touch /foo/fichero && touch /foo/bar/fichero
RUN find /foo


El fichero /foo/bar/fichero no se creará (existirá en la capa "RUN touch", pero no en la siguiente y no en la capa final.
