enum SomeName {
  valueA,
  valueB
};

enum SomeName = valueA;


Tambien podemos usar el truco del typedef:
typedef enum {
  valueA,
  valueB
} SomeName;


El valor numérico asignado por defecto al enum será 0 para el primer elemento, 1 para el segundo, etc.

Podemos cambiarlo como:
typedef enum {
  valueA = 10,
  ...
