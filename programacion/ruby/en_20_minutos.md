https://www.ruby-lang.org/es/documentation/quickstart/

Imprimir por pantalla:
puts "hola mundo"

nil -> retorno vació de una función

3**2 es 3 al cuadrado

Módulo de matemáticas:
Math.sqrt(9)

Variables, tipificación dinámica (dick typing). Se convierte en el objeto que parezca:
> a=3
> a="adas"

Métodos:
def nombre
puts "funciones a realizar"
return "valor de retorno"
end

> nombre


Con parámetros
def metodo(variable)
puts "valor: #{variable}"
end

> metodo("valor")


Con valor por defecto:
def f(var = "por defecto")


Ruby detecta automáticamente que la variable es una string y podremos hacer operaciones con ella:
> a="hola"
> a.capitalize
=> "Hola"


Clases (debe empezar por mayúscula):
@x -> variable de instancia. Se mantiene en el objeto y la pueden usar los métodos.
Dentro de la clase siempre nos referiremos a esa variable como @x (no vale como en java que si no hay otra igual podemos llamarla de otra manera)

class Punto
  def initialize(x=1,y=2)
    @x=x
    @y=y
  end

  def muestra
    puts "Esta en (#{@x},#{@y})"
  end

  def ponX(x)
    @x=x
  end
end

Crear objeto:
> p = Punto.new(3.0,5.1)
> p.ponX(4)
> p.ponX"valor"  (si usamos las comillas no hace falta poner paréntesis)

Analizar métodos de una clase:
Punto.instance_methods
Punto.instance_methods(false)  sin mostrar los heredados

Preguntarle al objeto si tiene un método:
p.repond_to?("muestra")
=> true
p.repond_to?("calcula")
=> false

p.nil?  true si p está vacio

Definir setter y getter:
Class prueba
  attr_accessor :var
end
> r = Prueba.new()
> r.var   Muestra el valor (getter)
> r.var="asdas"  Define la variable (setter). Realmente es un: def var=(valor)


If-else
if variable.nil
  puts "vacia"
elsif variable == "esto"
  puts "era eso!"
else
  puts "nada de lo otro"
end


Bucles:
Iterador:
var = ["uno", "otro", 3, "fin"]
var.each do |v|
  puts "valor: #{v}"
end

var.respond_to?("each") == true -> es una lista de algun tipo

var.join(";")
=> "uno;otro;3;fin"

Comentarios de una línea con '#'


Al crear un fichero .rb:
if __FILE__ == $0
__FILE__ es la variable mágica que contiene el nombre del archivo que se está ejecutando en ese momento. $0 es el nombre del archivo usado para iniciar el programa. Esta verificación dice “si este es el archivo principal…”. Esto permite que un archivo sea utilizado como una biblioteca, y no ejecutar código en ese contexto. Pero si el archivo está siendo usado como un ejecutable, entonces ejecuta ese código.
