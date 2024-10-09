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

# Librerías

## round-anything

<https://learn.cadhub.xyz/docs/round-anything/overview/>

aur/openscad-round-anything

## prism-chamfer

<https://github.com/hraftery/prism-chamfer>

Crea un prisma con chaflán (un corte en las esquinas para redondearlas).

# Ejemplos

<https://github.com/KitWallace/openscad/tree/master>
