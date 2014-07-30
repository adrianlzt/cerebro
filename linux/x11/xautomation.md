Ejecutar secuencias de teclas desde la linea de comandos

xte --help
lista de teclas

Ejecutar Control+Alt+t
xte 'keydown Control_L' 'keydown Alt_L' 'key t' 'keyup Control_L' 'keyup Alt_L'

Mover el ratón a una posición
xte 'mousemove 100 100'

Sample, drag from 100,100 to 200,200 using mouse1:
xte 'mousemove 100 100' 'mousedown 1' 'mousemove 200 200' 'mouseup 1'



