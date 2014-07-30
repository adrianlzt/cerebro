http://www.tutorialspoint.com/ruby/ruby_blocks.htm

Definimos un bloque "nombre{|var| comandos}" donde vamos procesando los valores que se nos envien por yield en el def "nombre".

#!/usr/bin/ruby

def test
   yield 5
   puts "You are in the method test"
   yield 100
end
test {|i| puts "You are in the block #{i}"}



@array = [1,2,3,4]

def metodo
  @array.each do |n|
    yield n
  end
end

metodo {|num|
  puts "Entre 2: #{num/2}"
}

