mirar cadquery.md
<https://cadquery.readthedocs.io/en/latest/intro.html#why-cadquery-instead-of-openscad>

# OpenSCAD

<https://openscad.org/>

Cheatsheet: <https://openscad.org/cheatsheet/>

The Programmers Solid 3D CAD Modeller

F5 previsualizar
F6 - render

Normalmente se diseña en 2d y luego se extruye.

## Online

<https://cadhub.xyz/>

<https://manifoldcad.org/>

## Doc

<https://learn.cadhub.xyz/docs/definitive-beginners/>

## Caracteres de control

- disable
  ! show only

## highlight / debug

% transparent / background

### Transparencia con color

Útil para ver un módulo que está restando a otro.

```openscad
%color("red", 0.5)
foo();
```

## Loops

<https://learn.cadhub.xyz/docs/definitive-beginners/loops>

```openscad
for(increment=[startNumber:endNmuber]){ /* your code ... */ }
```

## CLI

Renderizar usando la cli:

```bash
openscad -D var=123 -o out.stl file.scad
```

<https://en.wikibooks.org/wiki/OpenSCAD_User_Manual/Customizer#:~:text=%3D%20true%3B-,Saving%20Parameters%20value%20in%20JSON%20file,-%5Bedit%20%7C>

Pasando un fichero con los parámetros:

```bash
openscad -P params.json -P set-of-params -o out.stl file.scad
```

Dentro del fichero json puede haber varios sets de parámetros. Con -P definimos cual usar.

Podemos generar el fichero usando el modo "customizer" de la UI.

Ejemplo del fichero:

```json
{
  "parameterSets": {
    "FirstSet": {
      "Labeled_values": "13",
      "Numbers": "18",
      "Spinbox": "35",
      "Vector": "[2, 34, 45, 12, 23, 56]",
      "slider": "2",
      "stepSlider": "12",
      "string": "he"
    },
    "SecondSet": {
      "Labeled_values": "10",
      "Numbers": "8",
      "Spinbox": "5",
      "Vector": "[12, 34, 45, 12, 23, 56]",
      "slider": "12",
      "stepSlider": "2",
      "string": "hello"
    }
  },
  "fileFormatVersion": "1"
}
```

## Debug

Se puede usar echo para pintar valores:

```openscad
%echo("foo", foo);

echo("increment is currently", increment);
```

## Condicionales

```openscad
if (size < 10) {
  echo("Small");
} else if (size < 20) {
  echo("Medium");
} else {
  echo("Large");
}
```

Operadores:
`==` (equal to)
`!=` (not equal to)
`>` (greater than)
`<` (less than)
`>=` (greater than or equal to)
`<=` (less than or equal to)
`&&` (logical AND)
`||` (logical OR)
`!` (logical NOT)

## Exportar

Lo normal es exportar en .stl.

También podemos exportar como .svg, pero tendremos que tener una proyección.
Meter nuestro objeto final en esta función:

```openscad
projection(cut = false) {
    // Your 3D model here
}
```

# Redondear

<https://www.reddit.com/r/openscad/comments/lrcby9/minkowski_without_size_increase_cube_with_rounded>

## Conceptos

A chamfer is an interior or exterior corner with an angle or a type of bevel. Using a chamfer prevents the edges from becoming damaged and helps non-uniform edges appear more uniform.
Esto es quitar con un corte liso una esquina.

A fillet is a rounded corner that removes sharp edges or corners on a manufactured part
Esto sería como el redondeo de una multipresa.

## Librerías

Como añadirlas:

```openscad
include <Round-Anything/polyround.scad>
```

### round-anything

<https://learn.cadhub.xyz/docs/round-anything/overview/>

aur/openscad-round-anything

Dibujar una especie de "tecla" de un teclado.
Cóncava y redondeada.
El filtro de minkowski es muy costoso, intentar evitarlo.

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

### prism-chamfer

<https://github.com/hraftery/prism-chamfer>

### fillets

<https://github.com/ademuri/openscad-fillets>

Le decimos donde termina la pieza y hace ahí el fillet.
No vale para una pieza donde el fillet que queremos hacer no está en un mismo plano.

### BOSL2

<https://github.com/BelfrySCAD/BOSL2/wiki>

The Belfry OpenScad Library, v2.0. An OpenSCAD library of shapes, masks, and manipulators to make working with OpenSCAD easier. BETA

## Render

```bash
openscad -o foo.stl foo.scad
openscad -D var=val -D var1=val1 -o foo.stl foo.scad
```

## Ejemplos

<https://github.com/KitWallace/openscad/tree/master>

# Freecad

En freecad existe un _OpenSCAD Workbench_ que permite editar los archivos .scad de manera gráfica:

<https://wiki.freecad.org/Import_OpenSCAD_code>

Hay que habilitarlo en Choose Edit → Preferences → OpenSCAD from the Top menu, luego cambiar a OpenSCAD (a la izquierda del botón rojo de grabar macros) e importer el fichero de openscad.

# Thingverse

Si queremos publicar en thingverse, el código tiene que ser compatible con la versión 2015.03

Podemos probar con el contenedor de docker:
<https://hub.docker.com/r/openscad/openscad/tags?name=2015>

```bash
docker run --rm -it -v "$PWD:/mnt" -w "/mnt" openscad/openscad:2015.03 openscad -D round_edges_fn=2 -o a.stl hangboard.scad
```

# solidython

<https://github.com/jeff-dh/SolidPython>

Programar en python y generar código openscad.

Mirar también manifold

# Manifold

Geometry library for topological robustness

Se ha integrado manifold como backend de openscad: <https://github.com/openscad/openscad/pull/4533>

Esta librería premite generar modelos 3D usando JS y python.

Tiene una versión online con JS: <https://manifoldcad.org/#Intro>
