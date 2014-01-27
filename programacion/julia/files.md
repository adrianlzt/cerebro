http://docs.julialang.org/en/release-0.2/stdlib/base/#i-o

julia> log = open("FICHERO") # open(file_name[, read, write, create, truncate, append]) 
IOStream(<file LOG>)

julia> open(readall, "LOG") # Abre el fichero LOG y se lo pasa a la funcion readall, que lo convierte todo a string
"contenido del fichero"

julia> readdlm("LOG2",' ')  # Lee un fichero y lo trocea segun el delimitador (que debe ser un caracter) y por lineas
2x2 Array{Any,2}:
 "palabra"  4.0
 "otra"     2.3

# Leer un fichero linea por linea
log = open("FICHERO")
while !eof(log)
  r = readline(log)
  println("linea: $r")
end
