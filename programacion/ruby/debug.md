http://webcache.googleusercontent.com/search?q=cache:mbvkmrw09hgJ:pivotallabs.com/ruby-debug-in-30-seconds-we-don-t-need-no-stinkin-gui/+&cd=2&hl=es&ct=clnk&gl=es

ruby -dw programa.rb
  -d debug mode
  -w verbose mode

gem install ruby-debug
En el fichero .rb meter
  require 'ruby-debug'
Donde queramos parar poner
  debugger


Esto parece que está roto en CentOS
ruby -rdebug myscript.rb 
then,

Interesantes para ejecutar al comienzo:
set autolist -- Execute 'list' command on every breakpoint
set autoeval -- Evaluate every unrecognized command
set autoreload -- Reload source code when changed


Breakpoint
  b <line>
  b /usr/lib/ruby/site_ruby/1.8/puppet/indirector/resource/ral.rb:25
  b /usr/lib/ruby/site_ruby/1.8/puppet/resource.rb:191 if title=="whatever"
i b
  mostrar breaks
del 1
  borrar breakpoint 1 (para listar, b)
n(ext) 
s(tep)
c(ontinue)
p(uts) variable
  for display
l
  mostrar código donde está parada la ejecucción
l =
  mostrar donde estoy
l -
  mostrar 10 lineas anteriores
l 20,30
  mostrar líneas entre la 20 y la 30
v g
 mostrar variables globales
v l / i v
  mostrar variables locales
var instance OBJETO
  show instance variables of object
eval codigo-a-ejecutar
  para llamar a funciones, evaluar código, etc
bt / where
  mostrar backtrace
i line
  mostrar linea en la que estamos
pp expression   
  evaluate expression and pretty-print its value

(like perl debug)


Una interfaz más sencilla para debug: pry
http://pryrepl.org/

You need to add
require 'pry'
to your source file and then insert a breakpoint in your source code by adding
binding.pry
at the place where you want to have a look at the things (this is like triggering a breakpoint in a classic IDE environment)

Once your program hits the
binding.pry
line, you'll be thrown right into the pry repl, with all the context of your program right at hand, so that you can simply explore everything around, investigate all objects, change state, and even change code on the fly.


Para usar comandos tipo, step, continue, next, etc. Instalar pry-debugger:
gem install pry-debugger

## COMANDOS PRY ##
ls -> lista variables
whereami -> código alrededor de donde está parado
puts var -> imprimre valor variable
next -> pasa por encima de funciones
step -> entra en funciones
