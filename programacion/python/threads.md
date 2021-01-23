http://stackoverflow.com/questions/11968689/python-multithreading-wait-till-all-threads-finished

Si usamos threads y queremos que el main no salga (porque mataría a las threads), debemos esperar a que vuelvan (y si no vuelven, se quedará esperando eternamente):
[x.join() for x in threads]


Matar la app desde un thread
http://stackoverflow.com/questions/1489669/how-to-exit-the-entire-application-from-a-python-thread
os.kill(os.getpid(), signal.SIGUSR1)

Extender un thread
http://pythoncentral.io/how-to-create-a-thread-in-python/


https://stackoverflow.com/questions/1643327/sys-excepthook-and-threading/60002752#60002752
En python 3.8, para gestionar exceptions de las hebras.
Aunque tal vez sea mejor meter un try-except en una función que llame la hebra para evitar esas excepciones.


# Errores
TypeError: unhashable type:
http://stackoverflow.com/questions/2134452/multiple-inheritance-in-python-problem-specific

Añadir a nuestra clase:
def __eq__(self, other): return self is other
def __hash__(self): return hash(id(self))
