http://ruby-doc.org/core-2.0.0/Module.html#method-i-attr_accessor

Definición automática de setters y getters.
Se usa en las clases. Como parámetro toma un símbolo ( :variable)

class Metodo
  attr_accessor(:one, :two)
  attr_accessor :otramanera
end
> m = Metodo.new()
> m.one   obtener el valor
> m.otramanera=("definir valor")
> m.otramanera= "asi tambien"

Internamente debe convertirse en algo así como:

def initialize
  @one = nil
end

def one
  print @one
end

def one=(valor)
  @one = valor
