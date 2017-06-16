These are used to translate memory addresses into function and variable names, so that they can be read by us humans. Without symbols, you'll see hexadecimal numbers representing the memory addresses profiled.

Si queremos symbols de un programa, podemos compilarlo nosotros mismos.
Cuando hacemos "file programa" debe poner "not stripped".
Si esta "stripped", modificar el build para que no haga "strip" sobre los binarios.
