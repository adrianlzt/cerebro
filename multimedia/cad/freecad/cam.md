<https://wiki.freecad.org/CAM_Walkthrough_for_the_Impatient/en>
<https://www.youtube.com/@opensourcecnc>

Para generar ficheros de GCode para controlar máquinas CNC, se puede usar FreeCAD CAM.

Antes de dar por terminado un proyecto dar al botón de "Check the CAM job for common errors".

Configurar el postprocesador según el controlador de la máquina.

Al hacer las distintos operations, podemos jugar con los parámetros para ajustar profundidad, ponerle dressings, etc.

# Ajustar ejes / posición

Edit -> Placement

<https://www.youtube.com/watch?v=2nddnR9L8LU>

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

# Addons

Para instalar addons, copiarlos a la carpeta Mod.

O desde la UI: Tools -> Addon manager

Se instalan en: ~/.local/share/FreeCAD/Mod

Las que vienen con la instalación están en /usr/share/freecad/Mod

# Brocas

<https://wiki.freecad.org/CAM_Tools>

Usar este plugin para gestionarlas: <https://github.com/knipknap/better-tool-library>

Abrir el ToolBit Dock -> Library editor.

Para crear una nueva: Create toolbit.

Primero elegiremos el tipo de broca. Viene ya predefinidos unos cuantos con FreeCAD: /usr/lib/freecad/Mod/CAM/Tools/Shape
Sin ficheros .zip con muchos ficheros dentro.
Llevan una imagen adjunta: (thumbnails/Thumbnail.png), supongo que para la recreación del trabajo.

Las almaceno en .local/share/FreeCAD/Tools/Bit
