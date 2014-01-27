comando > LOG  (envia unicamente stdout)
comando >& LOG  (tambien envia stderr)
comando > LOG 2>&1  (lo mismo que el anterior)

comando >> LOG  (añade al final del fichero la salida de stdout)
comando >> LOG 2>&1  (añade al final stdout+stderr)
comando &>> LOG  (lo mismo que al anterior)
