https://docs.unity3d.com/Manual/Example-CreatingaBillboardPlane.html

Un mesh tiene: vertices, UVs y triangulos.

# Vertices
Array de Vector3 con las posiciones de objeto

# Normal
Vector normal a la superficie del vértice.
Es para ver como afecta la luz (si la luz es paralela a este vector, full light; si es perpendicular, sin luz)

Si tenemos vértices con varias orientaciones, tendremos que duplicarlos para asignar a cada uno su normal correctamente (to get crispy edges).
Para objetos curvados las normales de los vértices tendrán orientaciones distintas. Habrá que tener intuición para saber como ponerlos.

# UVs
Es el plano para una textura.
Son las coordenadas X,Y, pero se les ha cambiado el nombre.

Para un plano formado por los vertices (mirando a la derecha):
 0,0,0
 0,0,1
 0,1,0
 0,1,1

El UV, para cada vertice seria:
 0,0 (aqui esta el margen inferior izquierdo de la textura)
 0,1
 1,0
 1,1 (aqui está el margen superior derecho de la textura)


# Triangulos
Definirlos en sentido clockwise, si no, el vector normal tendrá que estar dado la vuelta (creo)
Se ponen en orden los índices de los vértices que forman cada triángulo, cada plano.


## Piramide
var mesh = new Mesh();

var vertices = new Vector3[5];
vertices[0] = new Vector3(0, 0, 0);
vertices[1] = new Vector3(1, 0, 0);
vertices[2] = new Vector3(0, 0, 1);
vertices[3] = new Vector3(1, 0, 1);
vertices[4] = new Vector3(0.5f, 1, 0.5f);
mesh.vertices = vertices;

var tri  = new int[12];
tri[0] = 0;
tri[1] = 4;
tri[2] = 1;
//
tri[3] = 1;
tri[4] = 4;
tri[5] = 3;
//
tri[6] = 3;
tri[7] = 4;
tri[8] = 2;
//
tri[9] = 2;
tri[10] = 4;
tri[11] = 0;
mesh.triangles = tri;

