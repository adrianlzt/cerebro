Arrancar con docker


https://influxdb.com/docs/v0.9/guides/writing_data.html
Insertar un punto con la API:
curl -i -XPOST 'http://localhost:8086/write?db=mydb' --data-binary 'cpu_load_short,host=server01,region=us-west value=0.64 1434055562000000000'



use database
use database.retention_policy
select * from hd_used;
