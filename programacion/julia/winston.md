https://github.com/nolta/Winston.jl
http://winston.readthedocs.org/en/latest/

2D plotting for Julia

julia> Pkg.add("Winston")
julia> using Winston

julia> plot(x, y)
There is also an oplot command to add objects into already existing plots. To add something to this, use
Saca una ventana X11-TK, sin ningún tipo de opción

julia> oplot(x2, y2)
And finally save it with

julia> file("figure.png")   # .eps & .pdf are also supported
