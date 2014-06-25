http://ruby-doc.org/core-2.1.1/Object.html#method-i-send

Ejecutar métodos con sus parámetros.

class Klass
  def hello(*args)
    "Hello " + args.join(' ')
  end
end
k = Klass.new
k.send :hello, "gentle", "readers"   #=> "Hello gentle readers"


send(method, instance)



def funcion(a,b,c)
  puts "#{a} #{b} #{c}
end

a="funcion"
send(a,2,'hola','pepe')



snew.send("#{target.class.name.underscore}_id=",target.id)
target.class.name.underscore = host_group

Equivalente
snew.host_group_id= target.id
