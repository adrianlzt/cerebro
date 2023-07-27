Arrancar contendor:
docker run --rm -it --name influxdb2 --net host infuxdb

Tenemos que hacer el setup:
docker exec influxdb2 influx setup \
      --username admin \
      --password adminadmin \
      --org admin \
      --bucket admin \
      --force

Borrar métricas:
influx delete -t MITOKEN -o MIORG --bucket NOMBREBUCKET --host https://europe-west1-1.gcp.cloud2.influxdata.com --predicate '_measurement="errors"' --start '1970-01-01T00:00:00Z' --stop '2022-01-01T00:00:00Z'


# Ingestar csv
https://docs.influxdata.com/influxdb/cloud/write-data/developer-tools/csv/#:~:text=Use%20the%20influx%20write%20command,of%20the%20influx%20write%20command.
