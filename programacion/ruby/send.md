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
