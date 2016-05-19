SHOW SERIES
para ver todas las series que tenemos


Una medida particular con una serie de tags es una serie.

Por ejemplo, para la measurement cpu y los tags
host=AAA
project=pepe

Todos los puntos de esa medida con esos tags seria una serie

Hay que intentar mantener el número de unique series controlado.

No entiendo muy bien como, pero si tenemos dos tags
user_id y run_id, y cada run_id solo pertenece a un user_id, no se incrementa el número de uniq_series por cada run_id nuevo.


No debemos pasar de 1.000.000 de series:
Your series cardinality is very high (numSeries 3113798), presumably due to the arbitrary tagging. When series cardinality rises above 1 million the database needs significant amounts of RAM just for the index. As the index consumes more RAM, it reduces the scratch space available for queries. 
https://groups.google.com/forum/#!searchin/influxdb/enforce$20uniqueness$20while$20still$20being$20performant/influxdb/JjpVu_9RF8c/lHItTFHoAQAJ
