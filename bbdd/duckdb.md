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
.edit # edit last command
```

## CSV

```
select "V DC",count(*) from read_csv_auto('fichero.csv') group by "V DC" limit 100;
```

```
WITH ints AS(
    SELECT
      a,
      CAST(lat AS INTEGER) AS lat,
      CAST(lng AS INTEGER) AS lng
    FROM read_csv_auto( '/dev/shm/output.csv')
  )
  SELECT
    lat,
    lng,
    mean(a)
  FROM
    ints group by lat,lng;
```

## XLSX

```bash
INSTALL spatial;
LOAD spatial;
select * from st_read('Matrix_19_01_2025.xlsx')
```

# Query

Se pueden usar CTEs / WITH: <https://duckdb.org/docs/sql/query_syntax/with.html>

# Docker

<https://github.com/data-catering/duckdb-docker>

<https://github.com/duckdb/duckdb/discussions/8154>
