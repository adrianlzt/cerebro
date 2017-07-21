https://www.tutorialspoint.com/cprogramming/c_unions.htm

No es muy recomendable usarlos.
Solo en algunos casos muy particulares.

Es como un struct, pero todos sus miembros comparten la misma dirección de memoria.
A priori no sabemos cual de los valores se encuentra almacenado.

Podemos usar otra variable tipo enum para almacenar que dato hemos guardado en el union.

union OneThingOrAnother {
  int Integer;
  float RealNumber;
};

typedef union {
  int Integer;
  float RealNumber;
} OneThingOrAnother ;

El tamaño del union será el del mayor de los elementos.

Acceso a unions:
OneThingOrAnother var;
var.Integer = 1;
printf("%d\n", var.Integer);

Si almacenamos otro valor en el union, pisará al primero.
