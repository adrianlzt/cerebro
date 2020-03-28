https://nodejs.org/api/debugger.html

# Inspector, debug con google chrome
node --inspect --inspect-brk app.js

Nos permite usar el chrome dev tools para debugear un programa.


chrome://inspect



# Funcionalidad basica, tipo gdb o python -m pdb

node debug script.js

sb(4)
  break point en linea 4

list()
  mostrar en la parte de codigo que estamos

c
  continue

n
  next

s
  step

repl
  abrir REPL de javascript para consultar valores, etc
  podemos poner las variables directamente para conocer su valor
  > x
  5
  Control+c para salir del repl
