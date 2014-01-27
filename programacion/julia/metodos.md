# Al definir una funcion sale la siguiente linea
nombrefuncion (generic function with 1 method)
# Esto nos dice cuantas veces se ha defido una funcion con este nombre
# Para decidir que funcion se ejecutará, comprobara todos los parametros y escogera el tipo más definido (esto se llama Multiple Dispatching)
super(Int64) #=> Signed
prueba(a::Signed) = print("funcion con dato signed")
prueba(a::Int64) = print("function con dato int64")
prueba(3) #=> function con dato int64


## Métodos paramétricos ##
same_type{T}(x::T, y::T) = true
same_type(x,y) = false

julia> same_type(1, 2)
true
julia> same_type(1, 2.0)
false

Tambien lo podemos usar para definir super tipo de dato queremos
same_type_numeric{T<:Number}(x::T, y::T) = true

Solo se podrá llamar a la función con dos números del mismo tipo (dos strings fallará por ejemplo)
