<http://aws.amazon.com/es/glacier/>
<https://docs.aws.amazon.com/cli/latest/reference/glacier/index.html>

En vez de usar Glacier directamente, es mejor usar S3 Glacier storage classes.
Desde el punto de vista del usuario es como S3, pero por debajo se almacena en Glacier.
<https://stackoverflow.com/a/65929235>

"Amazon S3 Glacier" es lo antiguo.

Los nuevos son:

- S3 Glacier Instant Retrieval: almacenamiento de datos de archivo de acceso cada tres meses con recuperación instantánea en milisegundos
- S3 Glacier Flexible Retrieval: Para copias de seguridad y archivos a largo plazo con la opción de recuperación de 1 minuto a 12 horas
- S3 Glacier Deep Archive: almacenamiento de archivos de datos a largo plazo a los que se accede una o dos veces al año y que se pueden restaurar dentro de un plazo de 12 horas

Para usar el nuevo "glacier", creamos un bucket de s3 normal y tendremos que seleccionar el storage class adecuado al subir los objetos.

Amazon Glacier es un servicio de almacenamiento de coste extremadamente bajo, que ofrece almacenamiento seguro y duradero para realizar copias de seguridad y archivar datos. Para mantener un bajo coste, Amazon Glacier está optimizado para datos a los que se accede con poca frecuencia y para cuando los tiempos de recuperación de varias horas son necesarios. Amazon Glacier permite a los clientes almacenar con seguridad cantidades pequeñas o grandes de datos por apenas 0,01 USD por gigabyte al mes, lo que representa un ahorro significativo en comparación con una solución centralizada en una empresa.

# Costes

<https://aws.amazon.com/es/glacier/pricing/>
<https://aws.amazon.com/es/glacier/faqs/?nc=hl&pg=ft#Data_retrievals>
<https://www.cloudberrylab.com/amazon-glacier-retrieval-pricing-explained.aspx>

TL;DR
almacenar 0.004$/GB*month
recuperar 0.1$/GB*month (coste transferencia)

Free tier, data retrieval: 10GB/month

Subir datos tiene un coste de 0.053$ por cada 1000 solicitudes, sin coste de transferencia.

Obtener los datos. Unas 3-5h, 0.01$/GB más 0.05$ por cada 1000 requests
Obtener los datos en corto plazo (1-5min): 0.03$/GB + 0.01$/request (u otro tipo más caro si queremos asegurarnos 100% que tendremos los datos en esos tiempos).
Obtener los datos en largo plazo (5-12h), 0.0025$/GB más 0.025$ por 1000 requests

Tambien hay que sumar los costes de transferencia de ficheros:
1GB/Mes gratis
0.09$/GB (baja si sobrepasamos los 10TB)

# Carga de datos

<https://docs.aws.amazon.com/es_es/amazonglacier/latest/dev/uploading-an-archive.html>

El concepto que maneja Glacier es el de "archivos", donde estos pueden ser ficheros simples, o .tar o .zip. Una vez subido no se puede modificar.
Los "archivos" se almacenan en "almacenes". Existe un límite de 1000 almacenes por cuenta.

Se pueden subir los ficheros directamente o usando la API MultipartUpload para poder hacer resume.

# Recuperación de datos

Para solicitar los datos tenemos que crear una solicitud. Desde que nos la aprueben, tendremos los datos disponibles 24h en S3.

Se puede solicitar una lista (json o csv) del contenido de un almacén, aunque esta información solo se actualiza una vez al día, por lo que recomiendan que almacenes en otro lado el índice con la información que has almacenado.
<https://docs.aws.amazon.com/es_es/amazonglacier/latest/dev/vault-inventory.html>

Se pueden configurar notificaciones vía SNS para cuando se completen tareas de listado y recuperación de datos.

## Obtener rango

Podemos solicitar solo una parte del fichero, especificando en MBs desde el inicio y el tamaño.
Esto puede ser util si hemos subido un fichero .tar, ya que podemos coger trozos del fichero que contentan algun elemento dentro y seguirá siendo válido.
No valdrá si lo hemos comprimido (.tar.gz)

Como sabemos que trozo queremos? Nos dejan ver la metadata?

# Borrado de datos

<https://docs.aws.amazon.com/es_es/amazonglacier/latest/dev/deleting-an-archive.html>

Es gratuito, excepto si el dato lleva menos de 90 días, que en ese caso nos cobrarán lo que reste de almacenar ese dato hasta esos 90 días.

# CLI

Para configurarlo mirar nube/amazon/awscli.md

Listar vaults:
aws glacier list-vaults --account-id -

Crear vault:
aws glacier create-vault --account-id - --vault-name prueba

Subir un fichero
aws glacier upload-archive --account-id - --vault-name prueba --archive-description "una descripcion del fichero" --body imagenes.tar
Devuelve el identificador y el path, estilo /560750/vaults/prueba/archives/1gWPn...

Podemos pasar un checksum (sha256) del fichero para asegurar que ha subido correctamente:
--checksum xxx

Como saber cuanto va a tardar? nethogs

Para subir ficheros de más de 100MB usar multipart.
Script en python para subir con este método:
<https://github.com/tbumi/glacier-upload/blob/develop/src/glacier_upload/upload.py>

Obtener contenido de un almacén:
aws glacier initiate-job --account-id - --vault-name prueba --job-parameters '{"Type": "inventory-retrieval"}'
  nos devuelve un id del job

Consultar el estado de las jobs (para enterarnos lo mejor es configurar un topic de SNS que nos envie un email y asociarlo al vault):
aws glacier list-jobs --account-id - --vault-name prueba
  InProgress
  Una prueba que he hecho, ha tardado 2h en devolverme una job de inventory retrieval

Obtener el resultado del job (el job desaparecerá al cabo de las horas):

```bash
aws glacier get-job-output --account-id - --vault-name prueba --job-id XXX out.json
```

Esperar hasta que el job haya terminado, notificar y obtener el resultado:

```bash
while [[ $(aws glacier list-jobs --account-id NNN --region us-east-2 --vault-name backup | jq '.JobList[0].Completed') == "false" ]]; do
echo -n "."
sleep 600
done; pushbullet "glacier end"; aws glacier get-job-output --account-id NNN --region us-east-2 --vault-name backup --job-id XXXXXX job-output.json
```

Solicitar bajar un fichero (no estoy seguro si para ficheros enormes este es el sistema adecuado)
aws glacier initiate-job --account-id - --vault-name my-vault --job-parameters '{"Type": "archive-retrieval", "ArchiveId": "XXX", "Description": "Solicitud de fichero AAA el YYYYMMDD-HHMM"}'

Una vez está listo el job, nos bajamos el fichero con:
aws glacier get-job-output --account-id - --vault-name prueba --job-id XXX fichero.download

Borrar archive:
aws glacier delete-archive --account-id - --vault-name prueba --archive-id XXX

Borrar vault (hace falta que no tenga ningun archive):
aws glacier delete-vault --account-id - --vault-name prueba
