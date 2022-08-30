http://php.net/manual/es/function.gettype.php
gettype($var)
nos devuelve un string con el tipo de variable que es.


Variable de entorno:
$_ENV["USER"]
$_SERVER["USER"]
Da un error si no está definida.

getenv('PATHH');
Esta función devuelve FALSE si no esta definida la var


# tipo / gettype
```
php > $a="hola"; print(gettype($a));
string
php > $a=2; print(gettype($a));
integer
php > $a=2.3; print(gettype($a));
double
```
