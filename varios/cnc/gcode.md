Es el fichero que se envía a la CNC.

Es un fichero de texto que contiene las instrucciones que la máquina debe seguir para realizar el trabajo.

Visualizador online: <https://ncviewer.com/>

Cheatsheet: <https://www.probotix.com/gcode_cheatsheet.pdf>

Ejemplo haciendo un cuadrado, sin arrancar el spindle:

```gcode
G21 ; Set units to millimeters
G90 ; Absolute positioning
G17 ; XY plane selection
G54 ; Work coordinate system
G0 Z5 ; Move to safe height
G0 X0 Y0 ; Move to start position
G1 Z0 F100 ; Move to cutting depth
G1 X50 F200 ; Cut to (50,0)
G1 Y50 ; Cut to (50,50)
G1 X0 ; Cut to (0,50)
G1 Y0 ; Cut to (0,0), completing the square
G0 Z5 ; Move to safe height
G0 X0 Y0 ; Return to origin
M2 ; End program
```

Con la máquina forest scientific no me dejar usar G54, me dice que quiere usar la posición absoluta de la máquina y que no está definida.

# Códigos

M3, M4 S Turn spindle clockwise or counterclockwise
M5 Stop spindle

También se puede poner como "M05".

El M3/M4 llevan un parámetro S, que es la velocidad.
Ejemplo:
M3 S1000
