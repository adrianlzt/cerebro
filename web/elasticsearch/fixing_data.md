Distintas estrategias para arreglar datos mal indexados: Reindex API, the Update By Query API, Painless scripting, and ingest pipelines

Mirar:
 reindexacion.md
 update.md (update_by_query)
 ingest_node.md
 scripts.md


Para poder seguir que documentos se han reindexado correctamente, un "truco" suele ser agregar un campo extra:
"reindexBatch": {
  "type": "byte"
}

Este campo lo iremos actualizando cada vez que el reindexado de ese doc se haya hecho correctamente.
