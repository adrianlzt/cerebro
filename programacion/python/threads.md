http://stackoverflow.com/questions/11968689/python-multithreading-wait-till-all-threads-finished

Si usamos threads y queremos que el main no salga (porque mataría a las threads), debemos esperar a que vuelvan (y si no vuelven, se quedará esperando eternamente):
[x.join() for x in threads]

