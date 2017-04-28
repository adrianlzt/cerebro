0.10.0
Using batched writes, we were able to insert more than 300,000 points per second on a c3.8xlarge instance in AWS. 



6/4/2017 v1.2.2
https://www.influxdata.com/path-1-billion-time-series-influxdb-high-cardinality-indexing-ready-testing/
until now the inverted index was an in-memory data structure that was built during startup of the database based on the data in TSM. This meant that for every measurement, tag key/value pair, and field name there was a lookup table in memory to map those bits of metadata to an underlying time series. For users with a high number ephemeral series they’d see their memory utilization go up and up as new time series got created. Further, startup times would increase as all that data would have to be loaded onto the heap at start time.



Cuidado con las CQ, chupan bastante CPU. Se puede usar Kapacitor para sacar ese procesado a otra máquina.



# Pequeñas pruebas de performance

Query: select * from ping limit N

  N       tiempo
10000     0.47
100000    2.94
609502    12.35
