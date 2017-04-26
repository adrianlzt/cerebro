https://docs.influxdata.com/influxdb/latest/query_language/data_exploration/#subqueries

SELECT_clause FROM ( SELECT_clause FROM ( SELECT_statement ) [...] ) [...]


SELECT SUM("max") FROM (SELECT MAX("water_level") FROM "h2o_feet" GROUP BY "location")

