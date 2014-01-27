Para medir performance podemos usar @time.
Ejemplo: @time [sqrt(100000) for i in 1:100000000];


http://www.johnmyleswhite.com/notebook/2013/12/06/writing-type-stable-code-in-julia/
Para mejorar la performance tenemos que usar "tipos estables" (Type-Stable), es decir, que el tipo de dato de una variable no cambie a lo largo de la ejecucción.
Ejemplo:

julia> @time [(r=1.0;r+=sin(3.2)) for i in 1:50000000];
elapsed time: 1.218814279 seconds (400000048 bytes allocated)

julia> @time [(r=1;r+=sin(3.2)) for i in 1:50000000];
elapsed time: 2.973819586 seconds (1200000048 bytes allocated)

En el segundo caso la variable 'r' lo primero que hace es cambiarse de tipo Int a tipo Float.


Ver el codigo LLVM(IR) generado:
julia> code_llvm(funcion, (Int, ))  

