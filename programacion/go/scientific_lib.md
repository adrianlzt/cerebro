https://github.com/cpmech/gosl

Gosl is a computing library written in go language (golang) to help with the development of software for scientific research. The library tries to be as general as possible. The use of concurrency for multi-threaded applications and message passing for parallel computations are considered. Functions and structures for geometry calculations, random numbers generation and probability distributions, optimisation algorithms, and plotting and visualisation are implemented as well. This library helped with the development of the results presented in [1-5].


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
