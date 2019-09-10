Gestión para tener high concurrency

Hacemos todo lo más rápido posible para más tarde limpiar lo que no sea necesario.
Si abrimos una TX, solo cuando se hace el commit el valor está disponible para el resto, un select del cliente B entre el update y commit del cliente A, verá el valor antes del update de A.
