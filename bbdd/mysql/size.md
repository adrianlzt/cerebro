Ver el tamaño de las tablas en MB:

SELECT table_name AS "Tables", 
round(((data_length + index_length) / 1024 / 1024), 2) "Size in MB" 
FROM information_schema.TABLES 
WHERE table_schema = "$DB_NAME";


Para ver el de una tabla en concreto:
SELECT table_name AS "Table", 
round(((data_length + index_length) / 1024 / 1024), 2) "Size in MB" 
FROM information_schema.TABLES 
WHERE table_schema = "$DB_NAME"
AND table_name = "$TABLE_NAME";


Find total number of tables, rows, total data in index size for given MySQL Instance
SELECT count(*) tables,
  concat(round(sum(table_rows)/1000000,2),'M') rows,
  concat(round(sum(data_length)/(1024*1024*1024),2),'G') data,
  concat(round(sum(index_length)/(1024*1024*1024),2),'G') idx,
  concat(round(sum(data_length+index_length)/(1024*1024*1024),2),'G') total_size,
  round(sum(index_length)/sum(data_length),2) idxfrac
FROM information_schema.TABLES;

Find the same data using some filter 
SELECT count(*) tables,
       concat(round(sum(table_rows)/1000000,2),'M') rows,
       concat(round(sum(data_length)/(1024*1024*1024),2),'G') data,
       concat(round(sum(index_length)/(1024*1024*1024),2),'G') idx,
       concat(round(sum(data_length+index_length)/(1024*1024*1024),2),'G') total_size,
       round(sum(index_length)/sum(data_length),2) idxfrac
       FROM information_schema.TABLES
       WHERE  table_name like "%performance_log%";


Find biggest databases
SELECT
        count(*) tables,
        table_schema,concat(round(sum(table_rows)/1000000,2),'M') rows,
        concat(round(sum(data_length)/(1024*1024*1024),2),'G') data,
        concat(round(sum(index_length)/(1024*1024*1024),2),'G') idx,
        concat(round(sum(data_length+index_length)/(1024*1024*1024),2),'G') total_size,
        round(sum(index_length)/sum(data_length),2) idxfrac
        FROM information_schema.TABLES
        GROUP BY table_schema
        ORDER BY sum(data_length+index_length) DESC LIMIT 10;


Data Distribution by Storage Engines
SELECT engine,
        count(*) tables,
        concat(round(sum(table_rows)/1000000,2),'M') rows,
        concat(round(sum(data_length)/(1024*1024*1024),2),'G') data,
        concat(round(sum(index_length)/(1024*1024*1024),2),'G') idx,
        concat(round(sum(data_length+index_length)/(1024*1024*1024),2),'G') total_size,
        round(sum(index_length)/sum(data_length),2) idxfrac
        FROM information_schema.TABLES
        GROUP BY engine
        ORDER BY sum(data_length+index_length) DESC LIMIT 10;

Encontrar las tablas más grandes:
SELECT CONCAT(table_schema, '.', table_name),
       CONCAT(ROUND(table_rows / 1000000, 2), 'M')                                    rows,
       CONCAT(ROUND(data_length / ( 1024 * 1024 * 1024 ), 2), 'G')                    DATA,
       CONCAT(ROUND(index_length / ( 1024 * 1024 * 1024 ), 2), 'G')                   idx,
       CONCAT(ROUND(( data_length + index_length ) / ( 1024 * 1024 * 1024 ), 2), 'G') total_size,
       ROUND(index_length / data_length, 2)                                           idxfrac
FROM   information_schema.TABLES
ORDER  BY data_length + index_length DESC
LIMIT  10;
