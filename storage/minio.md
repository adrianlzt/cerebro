<https://minio.io/>

Storage de objetos con api compatible con Amazon S3

# Server

## Docker

<https://docs.min.io/docs/minio-docker-quickstart-guide>

docker run -p 9000:9000 --name minio1 \
 -e "MINIO_ACCESS_KEY=AKIAIOSFODNN7EXAMPLE" \
 -e "MINIO_SECRET_KEY=wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY" \
 -v /mnt/data:/data \
 -v /mnt/certs:/certs \
 minio/minio server /data -S /certs

En /mnt/certs
private.key
public.crt (con la cadena de certs, creo)

Si no le ponemos los certificados, arrancará con http.

# Client s3cmd

<https://docs.min.io/docs/s3cmd-with-minio.html>

Hay ciertas cosas que mcli no puede hacer.

~/.s3cfg

# Setup endpoint

host_base = play.min.io:9000
host_bucket = play.min.io:9000
bucket_location = us-east-1
use_https = True

# Setup access keys

access_key = Q3AM3UQ867SPQQA43P2F
secret_key = zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG

# Enable S3 v4 signature APIs

signature_v2 = False

# SDK

Policy que permite bajar objetos del bucket "notifier" pero no listar
<https://gist.github.com/3873876d87da2b8a18f3d92d3d5e304d>
Cargarlo con minio-py set_bucket_policy()

# Client mcli

## Añadir server

mcli config host add ALIAS URL ACCESSKEY SECRETKEY

## Listar

mcli ls ALIAS
lista todos los buckets del host/server

## cp / download

mcli --insecure cp --recursive ALIAS/foo/bar .

## stat

Metadatos sobre un fichero
mcli stat ALIAS/DIR/FILE

## policy

Hacer un bucket publico
mcli policy set public ALIAS/BUCKET

# Upload

## curl

<https://www.burgundywall.com/post/upload-minio-curl>

```bash
#!/bin/bash

# usage: ./minio-upload my-bucket my-file.zip

bucket=$1
file=$2

host=minio.example.com
s3_key='secret key'
s3_secret='secret token'

resource="/${bucket}/${file}"
content_type="application/octet-stream"
date=`date -R`
_signature="PUT\n\n${content_type}\n${date}\n${resource}"
signature=`echo -en ${_signature} | openssl sha1 -hmac ${s3_secret} -binary | base64`

curl -v -X PUT -T "${file}" \
          -H "Host: $host" \
          -H "Date: ${date}" \
          -H "Content-Type: ${content_type}" \
          -H "Authorization: AWS ${s3_key}:${signature}" \
          https://$host${resource}
```
