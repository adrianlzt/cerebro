pipenv install google-cloud-bigquery

Esto también nos instala la cli "bq", que nos permite listar, queries, crear vistas, etc

Loguear (abrirá un navegador):
gcloud auth application-default login



# API
test.py:
from google.cloud import bigquery

client = bigquery.Client(project="foobar")

# Perform a query.
QUERY = (
    'SELECT name FROM `bigquery-public-data.usa_names.usa_1910_2013` '
    'WHERE state = "TX" '
    'LIMIT 100')
query_job = client.query(QUERY)  # API request
rows = query_job.result()  # Waits for query to finish

for row in rows:
    print(row.name)


## Crear vista
from google.cloud import bigquery
from google.cloud.bigquery import Table
client = bigquery.Client(project="foobar")
t = Table("PROJECT.DATASET.VIEWNAME")
t.view_query = "select 2 as num"
client.create_table(t)


# Bq
Mostrar proyectos
bq ls -p

Listar datasets de un proyecto:
bq ls --project_id=PROJECT

Listar jobs de un proyecto:
bq ls -j PROJECT

Tablas y vistas de un proyecto/dataset
bq ls --project_id=PROJECT --dataset_id DATASET

Crear una vista:
bq mk --project_id=PROJECT --dataset_id DATASET --view="select 1 as num" VIEWNAME
