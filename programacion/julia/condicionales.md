No hace falta identar el código

if some_var > 10
    println("some_var is totally bigger than 10.")
elseif some_var < 10    # This elseif clause is optional.
    println("some_var is smaller than 10.")
else                    # The else clause is optional too.
    println("some_var is indeed 10.")
end

No hay "switch"


Error si la base es menor que 2 o mayor que 62
2 <= base <= 62 || error("invalid base: $base")
