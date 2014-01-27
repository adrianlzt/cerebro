methods(Funcion) # Nos devuelve los constructores que tiene esa funcion


function add(x, y)
    println("x is $x and y is $y")

    # Functions return the value of their last statement
    x + y
end

# Definiendo funciones mas compactas
menos(x,y) = x-y
menos(3,2) #=> 1


# Si queremos que el parametro sea de un tipo especifico
function cosa(var::Int64)
  println("el numero: $var")
end
cosa(2) #=> el numero: 2
cosa('2') #=> ERROR: no method cosa(Char,)

## Mirar metodos.md ##
# Al definir una funcion sale la siguiente linea
nombrefuncion (generic function with 1 method)  
# Esto nos dice cuantas veces se ha defido una funcion con este nombre
# Para decidir que funcion se ejecutará, comprobara todos los parametros y escogera el tipo más definido (esto se llama Multiple Dispatching)
super(Int64) #=> Signed
prueba(a::Signed) = print("funcion con dato signed")
prueba(a::Int64) = print("function con dato int64")
prueba(3) #=> function con dato int64

# Si hacemos
mates(x::Signed,y::Int64) = x+y #=> mates(generic function with 1 method)
mates(x::Int64,y::Signed) = x-y
Warning: New definition 
    mates(Int64,Signed) at none:1
is ambiguous with: 
    mates(Signed,Int64) at none:1.
To fix, define 
    mates(Int64,Int64)
before the new definition.
mates (generic function with 2 methods)

# No queda claro que funcion aplicar, y por eso nos da el error



# You can define functions that take a variable number of
# positional arguments
function varargs(args...)
    println("primer parametro: $(args[1])")
    return args
    # use the keyword return to return anywhere in the function
end

# Definir funciones con valores por defecto
function defaults(a,b,x=5,y=6)
    return "$a $b and $x $y"
end


Para pasar parámetros a una función definiendo su nombre:
function keyword_args(;k1=4,name2="hello") # note the ;
    return ["k1"=>k1,"name2"=>name2]
end

keyword_args(name2="ness")

# You can combine all kinds of arguments in the same function
function all_the_args(normal_arg, optional_positional_arg=2; keyword_arg="foo")
...
end


# Julia has first class functions
#   This means the language supports passing functions as arguments to other functions, 
#   returning them as the values from other functions, and assigning them to variables or storing them in data structures
# La funcion interna es anónima, ya que no lleva nombre
function create_adder(x)
    adder = function (y)
        return x + y
    end
    return adder
end

julia> create_adder(2)(3)
5

# This is "stabby lambda syntax" for creating anonymous functions
(x -> x > 2)(3) #=> true

# This function is identical to create_adder implementation above.
function create_adder(x)
    y -> x + y
end

# You can also name the internal function, if you want
function create_adder(x)
    function adder(y)
        x + y
    end
    adder
end

add_10 = create_adder(10)
add_10(3) #=> 13


Este ejemplo en Go lo llaman closure:
function cadd(inic=0)
  sum = inic
  function adder(x)
    sum += x
  end
  return adder
end

julia> func = cadd(10)
adder (generic function with 1 method)
julia> func(2)
12
julia> func(3)
15


# Mapear array a función
function say(s)
  println("dice: $s")
end

# Estos hacen lo mismo
julia> map(say,["hola",3,'b'])
julia> [say(s) for s=["hola",3,'b']]
julia> [say(s) for s in ["hola",3,'b']]
dice: hola
dice: 3
dice: b

# Filtrar unos datos por un condicional
filter(x -> x > 5, [3, 4, 5, 6, 7]) #=> [6, 7]

# De otra manera
function comp(x)
  return x > 5
end
julia> filter(comp,[4,5,6]) #=> [6,7]

