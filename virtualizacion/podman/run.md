Para obtener el comando con el que se levantó el contenedor:

podman inspect logstash | jq '.[]|.Config | .CreateCommand | join (" ")'
