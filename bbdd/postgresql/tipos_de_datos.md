https://www.postgresql.org/docs/9.5/static/datatype.html

https://www.postgresql.org/docs/9.5/static/datatype-numeric.html
integer, 4 bytes, -2147483648 to +2147483647
real, 4 bytes,  6 decimal digits precision


text tiene autocompresión de manera transparente.

json
enum
uuid
cidr
macaddr
range



# enum
https://www.postgresql.org/docs/current/datatype-enum.html

Se definen los valores que puede tomar una columna como si fuese una string.
Por debajo se estará almacenando un número float por debajo, esto nos permitirá meter valores en medio a posteriorí (1, 1.5, 2).

CREATE TYPE nameType AS ENUM ('ok', 'warning', 'critical');

Es mejor usar esto que boolean, porque podremos añadir más valores luego.
También mucho mejor que usar una tercera tabla donde almacenamos el mapeo de intengers a los valores.


# range
https://www.postgresql.org/docs/current/rangetypes.html

Una columna con un tipo de dato que define un empieze y un final.
Ejemplo de utilidad, definir las horas de uso de una sala de reuniones y poner una excepción para evitar que dos rangos se superpongan.



# custom data types
Podemos crear custom data types
No suele ser muy común.

Cuando creamos una tabla automáticamente se crea una data type con el nombre de la tabla y los parámetros con las columnas que tenga la tabla.


Si queremos crear un data type con un "where" crearemos domains (mirar data_objects.md)
