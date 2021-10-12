# gstuil
Cli para administrar cloud storage

## IAM
https://cloud.google.com/storage/docs/gsutil/commands/iam

Obtener policy:
gsutil iam get gs://SOME_BUCKET

CUIDADO con "set", cambia la política entera.

"ch" añade grants a la política.
gsutil iam ch user:john.doe@example.com:objectCreator gs://ex-bucket

Añadiendo una SA a un bucket:
gsutil iam ch serviceAccount:terraform@PROJECT.iam.gserviceaccount.com:objectAdmin gs://tf-state


# Scopes
https://cloud.google.com/storage/docs/authentication

Scopes necesarios para poder leer/escribir/etc sobre cloud storage.
Se necesita el scope: https://www.googleapis.com/auth/devstorage.full_control
Esto es a parte que luego IAM nos permita o no.

En caso de una VM, debe estar parada para poder modifica su scope.

Podemos ver su service account y scopes con:
gcloud compute instances describe NOMBREVM

También para ver solo los scopes:
curl -H 'Metadata-Flavor: Google' "http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/scopes"

Se pueden cambiar los scopes y la service account parando y editando la vm.
https://cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances#using



# gsutil
Automáticamente coge el service account del nodo en el que estemos.

Mirar gcloud para ver como autenticarnos.

gsutil ls
gsutil ls -p proyecto
  listar buckets

gsutil ls gs://foobar
  listar contenidos del bucket foobar


# API

## Bajar / GET
https://cloud.google.com/storage/docs/json_api/v1/objects/get

GET https://storage.googleapis.com/storage/v1/b/bucket/o/object
Devuelve un JSON con los metadatos del objeto, sin el contenido.

curl https://storage.googleapis.com/storage/v1/b/BUCKET/o/OBJETO -v -H "Authorization: Bearer TOKEN"

En el caso de que ese objeto tenga acceso para la service account de la VM, podemos obtener ese token con (campo del JSON 'access_token'):
curl -H "X-Google-Metadata-Request: True" "http://metadata/computeMetadata/v1/instance/service-accounts/default/token"


Si queremos obtener el contenido:
curl "https://storage.googleapis.com/storage/v1/b/BUCKET/o/OBJETO?alt=media" ...


Bajando un fichero usando ansible:
    - name: Get service account token
      uri:
        url: "http://metadata/computeMetadata/v1/instance/service-accounts/default/token"
        headers:
          X-Google-Metadata-Request: True
      register: gcp_token

    - name: Download object
      get_url:
        dest: /tmp/hola.txt
        url: "https://storage.googleapis.com/storage/v1/b/BUCKET/o/hola.txt?alt=media"
        headers:
          Authorization: "Bearer {{gcp_token.json.access_token}}"


## Subir / insert / POST
https://cloud.google.com/storage/docs/json_api/v1/objects/insert

POST https://storage.googleapis.com/upload/storage/v1/b/BUCKET/o


curl "https://storage.googleapis.com/upload/storage/v1/b/BUCKET/o/?uploadType=multipart&name=NOMBREFICHERO" --data-binary @FICHERO_A_SUBIR -H "Authorization: Bearer TOKEN" -v -H "Content-Type: text/plain"


# Errores

# 403
https://stackoverflow.com/questions/27275063/gsutil-copy-returning-accessdeniedexception-403-insufficient-permission-from
Parece que aunque demos permisos de escritura a la service account de una VM, las VMs por defecto no permitirán esas acciones.

https://cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances#using
La combinación de niveles de acceso otorgados a la instancia de máquina virtual y las funciones de IAM otorgadas a la cuenta de servicio determina la cantidad de acceso que tiene la cuenta de servicio para esa instancia

Podemos ver los scopes de una VM en la UI, en la parte inferior de la página
Cloud API access scopes

Para escribir nuevos ficheros necesitamos
https://www.googleapis.com/auth/devstorage.full_control
