# Generar exportado
curl -fsS 'http://localhost:8080/admin/export?format=json'

Genera el fichero en un dir tipo:
/dgraph/export/dgraph.r163839.u0203.1556/g01.json.gz

Y el schema en:
/dgraph/export/dgraph.r163839.u0203.1556/g01.schema.gz


Mirar bulk.md para ver como importarlo.
