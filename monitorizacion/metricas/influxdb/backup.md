https://docs.influxdata.com/influxdb/v1.8/administration/backup_and_restore/#backup


# Recuperar a partir de ficheros .tsm
https://github.com/influxdata/influxdb/issues/8688

influx_inspect export -database dbname -datadir path -waldir path -out exportfile.txt
influx -import -path=exportfile.txt
