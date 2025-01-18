<https://duckdb.org/>
aur/duckdb-bin

In-process db system.

DuckDB runs analytical queries at blazing speed thanks to its columnar engine, which supports parallel execution and can process larger-than-memory workloads.

It can read and write file formats such as CSV, Parquet, and JSON, to and from the local file system and remote endpoints such as S3 buckets.

# CLI

duckdb fichero.db

```
.tables
.schema
```

## CSV

```
select "V DC",count(*) from read_csv_auto('fichero.csv') group by "V DC" limit 100;
```
