Editor CAD gratuito.

Tiene un modo para generar ficheros de OpenSCAD.

Puede abrir ficheros .stl

# CAM

<https://wiki.freecad.org/CAM_Walkthrough_for_the_Impatient/en>
<https://www.youtube.com/@opensourcecnc>

Para generar ficheros de GCode para controlar máquinas CNC, se puede usar FreeCAD CAM.

Antes de dar por terminado un proyecto dar al botón de "Check the CAM job for common errors".

Configurar el postprocesador según el controlador de la máquina.

## Dressings

<https://wiki.freecad.org/CAM_Workbench#:~:text=surface.%20Experimental.-,Path%20Dressup,-Axis%20Map%3A%20Remaps>

Unas opciones extras que podemos añadir a los paths ya calculados.

### Holding tags/tabs - Sujecciones

<https://www.youtube.com/watch?v=JZ4prlR6sps>

Selecionamos la operación de profile, vamos al menú de CAM -> Path dressup -> tags

### Ramp

<https://wiki.freecad.org/CAM_DressupRampEntry>

Para entrar a la pieza de forma suave.

## 3d

Si queremos hacer cosas en 3d, he visto esta herramienta en beta:
<https://wiki.freecad.org/CAM_Surface>

Hace uso de esta librería: <https://github.com/aewallin/opencamlib>

Es bastante lento. Calcular media esfera un minuto.
Podemos usar la propiedad "freeze" si estamos tocando la pieza, para evitar que recalcule.

## Supplemental commands

### Stop

<https://wiki.freecad.org/CAM_Stop>

Podemos enviar un comando de stop a la máquina hasta que el usuario decida continuar.
