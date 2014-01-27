https://github.com/JuliaLang/IJulia.jl

IJulia is a Julia-language backend combined with the IPython interactive environment. This combination allows you to interact with the Julia language using IPython's powerful graphical notebook, which combines code, formatted text, math, and multimedia in a single document

$ sudo pip install ipython pyzmq tornado jinja2
$ julia
> Pkg.add("IJulia")
$ ipython notebook --profile julia

http://127.0.0.1:8998
