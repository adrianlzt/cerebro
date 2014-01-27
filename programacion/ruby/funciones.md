#{var} es para cuando la función está dentro de un string

def funcion(parametro,param2="valor por defecto")
  puts "cosas que hacer"
  puts "usar la variable #{parametro}"
  print param2
end


Llamar­ a las funciones
> funcion("pepe","maria")
> funcion "pepe","maria"
> funcion"pepe"
> funcion"pepe",3

También podemos pasar un hash como parámetro:
> funcion(ip: "1.1.1.2")
cosas que hacer
usar la variable {:ip=>"1.1.1.2"}
valor por defecto

