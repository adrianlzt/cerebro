https://docs.influxdata.com/influxdb/v1.8/administration/backup_and_restore/#backup


influxd backup  -portable -database mytsd -start 2017-04-28T06:49:00Z -end 2017-04-28T06:50:00Z /tmp/backup/influxdb

influxd restore -portable -db FOO path/


# Recuperar a partir de ficheros .tsm
https://github.com/influxdata/influxdb/issues/8688

influx_inspect export -database dbname -datadir path -waldir path -out exportfile.txt
influx -import -path=exportfile.txt
