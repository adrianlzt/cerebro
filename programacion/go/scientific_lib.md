https://github.com/avelino/awesome-go#science-and-data-analysis
Varias libs para math


Parece que la más completa es https://www.gonum.org/
Su librería de estadística: https://pkg.go.dev/gonum.org/v1/gonum/stat?tab=doc


https://github.com/cpmech/gosl

Gosl is a computing library written in go language (golang) to help with the development of software for scientific research. The library tries to be as general as possible. The use of concurrency for multi-threaded applications and message passing for parallel computations are considered. Functions and structures for geometry calculations, random numbers generation and probability distributions, optimisation algorithms, and plotting and visualisation are implemented as well. This library helped with the development of the results presented in [1-5].



1_000_000 es l mismo que 1000000

También hay notación exponencial
1000000000 = 1e9

# Math
math.Pow(n,x)   n^x
math.Sqrt(a)
cmplx.Sqrt(n)  numeros complejos
rand.Intn(n)
math.Sqrt2  valor de la raiz de 2


Se pueden usar números complejos:
n = 2+3i


División entera y resto (numerator y denominator tienen que ser int)
quotient, remainder := numerator/denominator, numerator%denominator


# Sumar 1
variable++

Lo que no se puede hacer es usarla para devolver el valor anterior, ejemplo que no vale:
fmt.Println(i++)


# NaN / Inf
Los números float pueden ser NaN o Inf.

Para chequear si tienen alguno de estos valores
math.IsNaN(x)
math.IsInf(x,1) / math.IsInf(x,-1)


# Min / max
https://stackoverflow.com/questions/34259800/is-there-a-built-in-min-function-for-a-slice-of-int-arguments-or-a-variable-numb
  hay otras opciones

Como solucionar el problema de calcular el mínimo, cuando el valor de inicialización es 0.
for i, e := range v {
    if i==0 || e < m {
        m = e
    }
}

También podemos inicializar el max y el min con el primer valor del array antes del for
