Se pueden progrmar tareas para que se ejecuten a una hora determinada, o a través de un hook.

Se podrían programar tareas que se ejecuten cada 5', y si no es necesario, no se ejecutaría, sería la forma de hacer tareas por pooling


Github ejecuta un webhook, que llama a maestrodev.
Podríamos ejecutar una serie de composiciones, haciendo git clone a todas las ramas por ejemplo, y solo la que tenga cambios se ejecutaría.
