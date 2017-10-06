https://www.elastic.co/guide/en/kibana/current/scripted-fields.html
https://www.elastic.co/blog/using-painless-kibana-scripted-fields

Scripted fields compute data on the fly from the data in your Elasticsearch indices


https://discuss.elastic.co/t/parsing-and-applying-regex-in-kibana/60368/3
Because this will be slow at search-time, we recommend that once you’ve experimented with it to find your common use cases, use the reindex API to then persist these fields to your documents, and modify your index process for future documents.



Para configurar estos "scripted fields" vamos a "Management -> Index Patterns -> scripted fields"
Ahí ponemos el nombre del nuevo campo y el script con el que sacamos el valor.

Si queremos usar regexp deberemos reiniciar elasticsearch con el campo
script.painless.regex.enabled: true
en el fichero de conf: elasticsearch.yml
