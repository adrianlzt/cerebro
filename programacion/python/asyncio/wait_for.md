# Ejecutar corutina con un timeout
https://docs.python.org/3/library/asyncio-task.html#asyncio.wait_for

result = await asyncio.wait_for(fut, 60.0)

Si salta excepcion la podemos capturar con:
except asyncio.TimeoutError:


Para evitar que cuando salte el timeout cancelemos la corutina usamos shield:
https://docs.python.org/3/library/asyncio-task.html#asyncio.shield

res = await shield(something())

Quedaría (no probado):
result = await shield(asyncio.wait_for(fut, 60.0))
