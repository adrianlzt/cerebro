Los objetos tienen distintas propiedades (components).

# Components
Mesh Filter
Forma

Collider
Gestiona como interaccióna con los otros objetos
Si por ejemplo deshabilitamos esto, los otros objetos atravesarán este objeto.

Renderer
Como se ve
Aqui también está el tipo de material, que define color, transparencia, reflectividad, etc

Si queremos cambiar el color, transparencia, etc, tendremos que crear un nuevo material. Mirar assets.md para buscar algunos existentes
Podemos arrastras un material desde la lista de materiales a la lista de propiedades del objeto para aplicarlo.


Podemos añadir más propidedas con "Add component"

# Gravedad
Si queremos que le afecte la gravedad a nuestro objeto añadiremos el component: Physics
  Rigid body: tipo básico


# Scripts
Add component -> Scripts
Se puede programar en JS o C#

Podemos editar los ficheros en PROJECTDIR/Assets/Nombre.js
mirar scripts.md
