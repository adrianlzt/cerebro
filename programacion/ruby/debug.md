ruby -dw programa.rb
  -d debug mode
  -w verbose mode


ruby -rdebug myscript.rb 
then,

b <line>: put break-point
and n(ext) or s(tep) and c(ontinue)
p(uts) for display
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
