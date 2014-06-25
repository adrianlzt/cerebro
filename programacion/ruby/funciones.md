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

> a = ["pepe","maria"]
> funcion(*a)

También podemos pasar un hash como parámetro:
> funcion(ip: "1.1.1.2")
cosas que hacer
usar la variable {:ip=>"1.1.1.2"}
valor por defecto



Parece que en ruby >= 2.0 se puede hacer
  def my_function(a = nil, b=nil, c=500)
    ...
  end
  
  my_function(b=100)



Para llamar a una función y poder construir su nombre con variables mirar send.md
