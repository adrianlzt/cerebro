Si queremos ver si un programa se está quedando bloqueando por culpa de locks podemos usar strace

veremos líneas tipo:
22:56:43.609191 semop(555024396, [{9, 1, SEM_UNDO}], 1) = 0 <0.000036>
