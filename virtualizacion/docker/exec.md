Enviar el exec al log del container:

docker exec 59017f89 sh -c "pwd >/proc/1/fd/1"



Si queremos salir de un "exec -it"
control+p control+q
