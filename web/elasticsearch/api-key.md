Generar una api key

```
POST _security/api_key
{
  "name": "prueba adri"
}
```

Nos devuelve:

```
{
  "id": "Y4l5T5MBz4H3Qewosc6S",
  "name": "prueba adri",
  "api_key": "4JN35XICTUq-A4TPcFa0zQ",
  "encoded": "WTRsNVQ1TUJ6NEgzUWV3b3NjNlM6NEpOMzVYSUNUVXEtQTRUUGNGYTB6UQ=="
}
```

Ejemplo usando la api key con curl (usamos el 'encoded' que es el base64 de id:api_key):

```bash
curl -H "Authorization: ApiKey WTRsNVQ1TUJ6NEgzUWV3b3NjNlM6NEpOMzVYSUNUVXEtQTRUUGNGYTB6UQ==" http://localhost:9200/_cat/indices
```
