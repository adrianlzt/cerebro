<https://wiki.freecad.org/CAM_Walkthrough_for_the_Impatient/en>
<https://www.youtube.com/@opensourcecnc>
<https://www.youtube.com/@sliptonic>
parece que es uno de los desarrolladores de FreeCAD CAM.

Para generar ficheros de GCode para controlar máquinas CNC, se puede usar FreeCAD CAM.

Antes de dar por terminado un proyecto dar al botón de "Check the CAM job for common errors".

Configurar el postprocesador según el controlador de la máquina.

Al hacer las distintos operations, podemos jugar con los parámetros para ajustar profundidad, ponerle dressings, etc.

# Ajustar ejes / posición

Edit -> Placement

<https://www.youtube.com/watch?v=2nddnR9L8LU>

# Simuladores

Si instalamos Camotics (aur/camotics), nos aparecerá un nuevo simulador para este software (un icono con un "C").
<https://youtu.be/RFu-DQ04uZM?t=993>
No veo eso, pero podemos importar el gcode en camotics para hacer la simulación.
He tenido que crear una tool a mano que concuerde en número de identificación con el puesto en freecad para que use esa herramienta.
También he tenido que definir el stock material a mano, porque ponía uno muy grande.

# Dressings

<https://wiki.freecad.org/CAM_Workbench#:~:text=surface.%20Experimental.-,Path%20Dressup,-Axis%20Map%3A%20Remaps>

Unas opciones extras que podemos añadir a los paths ya calculados.

## Holding tags/tabs - Sujecciones

<https://www.youtube.com/watch?v=JZ4prlR6sps>

Selecionamos la operación de profile, vamos al menú de CAM -> Path dressup -> tags

## Ramp

<https://wiki.freecad.org/CAM_DressupRampEntry>

Para entrar a la pieza de forma suave.

## Path boundary

<https://wiki.freecad.org/CAM_DressupPathBoundary>

Para limitar la zona de trabajo.

# 3d

Si queremos hacer cosas en 3d, he visto esta herramienta en beta:
<https://wiki.freecad.org/CAM_Surface>

Hace uso de esta librería: <https://github.com/aewallin/opencamlib>

Es bastante lento. Calcular media esfera un minuto.
Podemos usar la propiedad "freeze" si estamos tocando la pieza, para evitar que recalcule.

# Supplemental commands

## Stop

<https://wiki.freecad.org/CAM_Stop>

Podemos enviar un comando de stop a la máquina hasta que el usuario decida continuar.

## Probing

<https://www.youtube.com/watch?v=dY8SIL1cdmA>

Parece que es para ajustar el eje Z.

# Brocas

<https://wiki.freecad.org/CAM_Tools>

Usar este plugin para gestionarlas: <https://github.com/knipknap/better-tool-library>
Al meter este plugin guarda los bits en /home/adrian/.local/share/FreeCAD/Bit
En ./Library/UUID.fctl almacena los mapeos de librería a bit.
Y las máquinas: ./Machine/UUID.json

Esto nos vale para calcular los parámetros de corte.
Por debajo una los cálculos de la app web. Mirar sus instrucciones: <https://brturn.github.io/feeds-and-speeds/instructions.html>

Permite importar catálogos para Fusion360: <https://github.com/knipknap/better-tool-library/blob/main/docs/formats.md#importing-vendor-catalogs>
DB de un fabricante de brocas: <https://spetools.com/en-eu/pages/spetool-tool-file-database>

Abrir el ToolBit Dock -> Library editor.

Para crear una nueva: Create toolbit.

Primero elegiremos el tipo de broca. Viene ya predefinidos unos cuantos con FreeCAD: /usr/lib/freecad/Mod/CAM/Tools/Shape
Sin ficheros .zip con muchos ficheros dentro.
Llevan una imagen adjunta: (thumbnails/Thumbnail.png), supongo que para la recreación del trabajo.

Las almaceno en .local/share/FreeCAD/Tools/Bit

# Spindle speed / Feed rate

<https://github.com/dubstar-04/FeedsAndSpeeds/>

<https://github.com/knipknap/better-tool-library>
No soporta importar brocas y luego hacer los cálculos: <https://github.com/knipknap/better-tool-library/issues/17>

Si le cambio el shape por uno de los que vienen con FreeCAD, si me deja hacer los cálculos.

# Texto

Usar un "shape string" de Draft. Podremos usarlo como job directamente, sin convertirlo en 3d.

## Vcarve

<<https://wiki.freecad.org/CAM_Vcarve>

# Postprocesado / gCode

Si no le pongo ningún _fixture_, no me genera el gcode.

Parece que por defecto suele poner G54 (use coordinate system 1).
