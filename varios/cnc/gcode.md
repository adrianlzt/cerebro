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

## Motion

G0 Rapid motion
G1 Coordinated motion ("Straight feed")
G2, G3 I J K or R Coordinated helical motion ("Arc feed") CW or CCW
G38.2 Straight Probe
G80 Cancel motion mode
G81 R L P Drilling Cycle
G82…G89 R L P Q Other canned cycles
G33 K Spindle-synchronized motion
G33.1 K Rigid Tapping
G76 P Z I J R K Q H L E Multipass lathe threading cycle

## Plane Selection (affects G2, G3, G81…G89, G40…G42)

G17 Select XY plane
G18 Select XZ plane
G19 Select YZ plane

## Distance Mode

G90 Absolute distance mode
G91 Incremental distance mode

## Feed Rate Mode

G93 Inverse time feed rate
G94 Units per minute feed rate
G95 Units per revolution

## Units

G20 Inches
G21 Millimeters

## Cutter Radius Compensation

G41, G42 D Start cutter radius compensation left or right
G41.1, G42.1 D L Start cutter radius compensation left or right, transient tool
G40 Cancel cutter radius compensation

## Tool Length Offset

G43 H Use tool length offset from tool table
G43.1 I K Use specified tool length offset for transient tool
G49 Cancel tool length offset

## Return Mode in Canned Cycles

G98 Retract to R position
G99 Retract to prior position

## Path Control Mode

G61 Exact Path mode
G61.1 Exact Stop mode
G64 P Continuous mode with optional path tolerance

## Stopping

M0 Pause Program
M2 End Program
M1, M30, M60 Other stop codes

## Spindle Control

M3, M4 S Turn spindle clockwise or counterclockwise
M5 Stop spindle
G96 D S Constant surface speed mode (foot/minute or meter/minute) with top speed
G97 RPM mode

## Coolant

M7 Turn mist on
M8 Turn flood on
M9 Turn all coolant off
F Set Feed Rate
S Set Spindle Speed
T Select Tool
M50…M53 P0 (off) or P1 (on) Feed Override, Spindle Override, Adaptive Feed, Feed Hold
G54…G59, G59.1…G59.3 Select coordinate system
O … sub/endsub, while/endwhile,
if/else/endif, do/while, call,
break/continue/return
M6 T Change tool
G4 P Dwell (seconds)
G10 L2 P X Y Z A B C Coordinate system origin setting
G28 Return to home
G30 Return to secondary home
G53 Motion in machine coordinate system
G92 X Y Z A B C Offset coordinate systems and set parameters
G92.1 Cancel offset coordinate systems and set parameters to zero
G92.2 Cancel offset coordinate systems but do not reset parameters
G92.3 Apply parameters to offset coordinate systems
M101…M199 P Q User-defined M-codes
(…) A comment "…" to the user
(MSG,…) Display the message "…" to the user (e.g., in a popup)
(DEBUG,…#123…#<foo>) Display the message (with variables substituted) like MSG
(PRINT,…#123…#<foo>) Display the message (with variables substituted) to stderr
M
