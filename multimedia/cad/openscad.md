<https://openscad.org/>

Cheatsheet: <https://openscad.org/cheatsheet/>

The Programmers Solid 3D CAD Modeller

F5 previsualizar
F6 - render

Normalmente se diseña en 2d y luego se extruye.

# Online

<https://cadhub.xyz/>

# Doc

<https://learn.cadhub.xyz/docs/definitive-beginners/>

# Caracteres de control

- disable
  ! show only

# highlight / debug

% transparent / background

## Transparencia con color

Útil para ver un módulo que está restando a otro.

```openscad
%color("red", 0.5)
foo();
```

# Loops

<https://learn.cadhub.xyz/docs/definitive-beginners/loops>

```openscad
for(increment=[startNumber:endNmuber]){ /* your code ... */ }
```

# Debug

Se puede usar echo para pintar valores:

```openscad
%echo("foo", foo);

echo("increment is currently", increment);
```

# solidython

<https://github.com/jeff-dh/SolidPython>

Programar en python y generar código openscad.

# Redondear

<https://www.reddit.com/r/openscad/comments/lrcby9/minkowski_without_size_increase_cube_with_rounded>

## Conceptos

A chamfer is an interior or exterior corner with an angle or a type of bevel. Using a chamfer prevents the edges from becoming damaged and helps non-uniform edges appear more uniform.
Esto es quitar con un corte liso una esquina.

A fillet is a rounded corner that removes sharp edges or corners on a manufactured part
Esto sería como el redondeo de una multipresa.

# Librerías

Como añadirlas:

```openscad
include <Round-Anything/polyround.scad>
```

## round-anything

<https://learn.cadhub.xyz/docs/round-anything/overview/>

aur/openscad-round-anything

Dibujar una especie de "tecla" de un teclado.
Cóncava y redondeada.

```openscad
include <Round-Anything/MinkowskiRound.scad>

module finger_platform(width, height, base_depth, cylinder_radius,cylinder_offset) {
    difference() {
        cube([width, base_depth, height]);

        translate([width/2, base_depth+1, height + cylinder_offset])
            rotate([90, 0, 0])
                cylinder(r=cylinder_radius, h=base_depth+2, $fn=100);
    }
}

$fn=10;
minkowskiOutsideRound(1,1)
finger_platform(25,10,30,60,55);
```

## prism-chamfer

<https://github.com/hraftery/prism-chamfer>

## fillets

<https://github.com/ademuri/openscad-fillets>

Le decimos donde termina la pieza y hace ahí el fillet.
No vale para una pieza donde el fillet que queremos hacer no está en un mismo plano.

## BOSL2

<https://github.com/BelfrySCAD/BOSL2/wiki>

The Belfry OpenScad Library, v2.0. An OpenSCAD library of shapes, masks, and manipulators to make working with OpenSCAD easier. BETA

# Ejemplos

<https://github.com/KitWallace/openscad/tree/master>

# Freecad

En freecad existe un _OpenSCAD Workbench_ que permite editar los archivos .scad de manera gráfica:

<https://wiki.freecad.org/Import_OpenSCAD_code>

Hay que habilitarlo en Choose Edit → Preferences → OpenSCAD from the Top menu, luego cambiar a OpenSCAD (a la izquierda del botón rojo de grabar macros) e importer el fichero de openscad.
