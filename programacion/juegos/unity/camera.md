Por defecto no veremos nada en la vista "Game", tendremos que añadir una camara.
GameObject -> Camera

Luego la podremos mover seleccionando la flecha (esquina superior izquierda) y pinchando sobre la cámara.


cameramove.cs
Script para movernos con la camara en el juego usando el raton

# Script
Ejemplo de la cámara siguiendo a un objeto

var target : Transform;
var distance = -10;
var lift = 1.5;

function Update ()
{
        transform.position = target.position + Vector3(0, lift, distance);
        transform.LookAt (target);
}
