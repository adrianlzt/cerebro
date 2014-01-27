$ julia
julia> 1 + 2
3
julia> 1+2;
(no imprime nada)
julia> ans  (valido en modo interactivo)
3
julia> ;pwd
/home/adrian

Control+D o quit() para salir

$ julia script.jl arg1 arg2

$ julia -e 'for x in ARGS; println(x); end' foo bar
foo
bar

$ julia -L programa.jl
Arranca cargando primero el programa.jl
