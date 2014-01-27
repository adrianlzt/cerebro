http://llvm.org/

The LLVM Project is a collection of modular and reusable compiler and toolchain technologies.

Es un compilador que convierte códgio de varios lenguajes en un código intermedio (IR, Intermediate Representation), lo optimiza y produce código máquina.


## IR ##
http://llvm.org/docs/LangRef.html
https://idea.popcount.org/2013-07-24-ir-is-better-than-assembly/
Que es IR?
IR is a low-level programming language, pretty similar to assembly


Para generar código IR desde julia:
julia> code_llvm(algunafuncion, (Int, ))  


Ejemplo sencillo con C:
https://idea.popcount.org/2013-07-24-ir-is-better-than-assembly/
