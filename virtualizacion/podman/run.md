Para obtener el comando con el que se levantó el contenedor:

podman inspect logstash | jq '.[]|.Config | .CreateCommand | join (" ")'

# Generar "podman run" de un contenedor

## runlike

```bash
pip install runlike
cp /usr/bin/{podman,docker} # solo necesario si no tenemos el binario de docker
runlike CONTENEDOR
```

No es exactamente lo mismo, pero generamos un fichero tipo "pod" de kubernetes que luego podemos ejecutar:

```bash
podman generate kube <container_name_or_id> > my-container.yaml
podman play kube my-container.yaml
```
