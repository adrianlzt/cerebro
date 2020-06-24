https://www.npmjs.com/package/throttle-debounce

Throttle execution of a function. Especially useful for rate limiting execution of handlers on events like resize and scroll.
En este caso solo se ejecuta la función una vez cada x tiempo. No vale para onChange, porque perderíamos ciertos cambios.



Debounce execution of a function. Debouncing, unlike throttling, guarantees that a function is only executed a single time, either at the very beginning of a series of calls, or at the very end.
Útil, por ejemplo, para un campo onChange, para que solo se ejecute la función cuando el usuario ha terminado de escribir (definimos un tiempo tras el cual se ejecutará).
