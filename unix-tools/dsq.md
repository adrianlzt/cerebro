https://github.com/multiprocessio/dsq#comparisons

Commandline tool for running SQL queries against JSON, CSV, Excel, Parquet, and more

# csv
dsq fichero.csv "select Severity from {} where Status='PROBLEM'"
cat fichero.csv | dsq -s csv "select Severity from {} where Status='PROBLEM'"

Se pueden hacer joins

# json
echo '[{"foo":123}, {"foo":500}]' | dsq -s json "select * from {} where foo > 300"

También funciona con ndjson/jsonl


# yaml
Parece que encapsula segundos niveles de datos como strings json


# schema
dsq fichero --schema


# caching
dsq some-large-file.json --cache 'SELECT COUNT(1) FROM {}'


# repl
dsq some-large-file.json -i


# nginx access log
formato json
cat nginx.log| dsq -s text/nginxaccess | jq

formato tabla
cat nginx.log| dsq -s text/nginxaccess --pretty
