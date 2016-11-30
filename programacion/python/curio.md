https://github.com/dabeaz/curio
Parecido a lo que hace asyncio

concurrent I/O con python 3


This allows for projects like curio to not only operate differently at a lower level (e.g., asyncio uses future objects as the API for talking to its event loop while curio uses tuples), but to also have different focuses and performance characteristics (e.g., asyncio has an entire framework for implementing transport and protocol layers which makes it extensible while curio is simpler and expects the user to worry about that kind of thing but also allows it to run faster).
