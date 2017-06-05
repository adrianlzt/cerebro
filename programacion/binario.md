# Entero a binario
>>> def toBin(n):
...     string=""
...     while n > 0:
...         r = n %2
...         n >>= 1
...         string = str(r) + string
...         
...     return string

La idea es que un 8 es un 1 shifted 3 casillas, por lo que aqui hacemos lo contrario.
Vamos encontrando los "unos" que habíamos "shifteado"


# Flotantes
3.25 -> 11.01
  ponemos la parte no deciamal como un numero binario normal
  la parte decimal se calcula como 1/(num binario)
  En el caso ".01" -> 01 al reves es 4, por lo tanto el valor es 1/4 = 0.25

  0 * (1/2^1) + 1 * (1/2^2) + ...


# IEEE 754
La representación de números decimales en binarios más corriente es
https://en.wikipedia.org/wiki/IEEE_floating_point

Para 32 bits:
Primer bit: signo (0 +, 1 -)
8 bits de exponente
23 bits de "fraction"

Para 64 bits tendremos 11 de exponente y 52 de fraccion
