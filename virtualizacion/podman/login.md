Podman olvida las credenciales de "podman login" entre reinicios.
Esto es porque almacena el fichero en /run/user/1000/containers/auth.json ${XDG_RUNTIME_DIR}/containers/auth.json)

Parece que si no existe va a buscar $HOME/.docker/config.json
