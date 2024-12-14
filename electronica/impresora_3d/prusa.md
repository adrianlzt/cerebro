Configuración de impresora.

0.n / VELOCIDAD

Lo primero es el tamaño de capa. Lo segundo lo rápido que se mueve la cabeza de impresión.

Importar la pieza .stl (o el formato que sea).

Lo básico luego es pinchar en el icono de "capas" de abajo a la izquierda para realizar el slicing.

Al hacer el slicing no colorea la pieza para indicar los distintos tipos de capas.

Tenemos dos sliders.
En de la izquierda es para ver como están formadas las capas.
El de abajo vemos como se va a mover la boquilla en cada capa.

# Colocación de la pieza

Lo más sencillo es usar "Colocar sobre una cara". Automáticamente nos ofrece unas caras sobre la que colocar la pieza.

# Soportes

La idea es minimizar los soportes, al final estamos gastando material que quitaremos.

El slicer intentará meter una capa especial en la unión entre el soporte y la pieza para que luego sea sencillo quitarlo.

# Altura de capa variable

Para modificar la altura de capa en una pieza, se puede hacer de forma variable.
En la vista 3d, seleccionar la pieza y pinchar la herramienta (barra superior) de "Altura de capa variable".

Podemos hacerlo a mano moviendo la línea azul hacia la izquierda o derecha.

Pero en la práctica lo mejor es darle a "Adaptativa", que lo calculará automáticamente.

# Cortar

Podemos cortar la pieza en dos en este mismo programa. En el menu de la izquierda.

Nos permite meter unos conectores luego para unir las piezas.

# Múltiples piezas

Por defecto irá haciendo capa a capa en todas las piezas.

Hay una opción para completar una pieza antes de pasar a la siguiente, en "Opciones de salida".

Intenta empezar por cerca derecha y va terminando por izquierda fondo.

# Pausas / cambio de color / custom gcode

Sobre el slider de la derecha podemos pinchar con el botón derecho para meter una pausa.

Esto nos permite para la impresión para hacer distintas cosas:

- Cambiar de color
- Cambiar de material
- Cambiar de boquilla
- insertar una pieza, por ejemplo una tuerca metálica, un imán, etc.

Si metemos una pieza metálica, intentarla meter rápido para que el metal absorva calor.

Luego la punta se tendrá que recalentar. Si la pieza que hemos metido está muy fría puede dar problemas.

# Configuraciones

Si modificamos algún parámetro nos aparecerá una flecha (tipo control+z) para dejar el valor con el valor por defecto.

## Filamentos

Normalmente no tocamos aquí.

## Impresoras

Normalmente no tocamos aquí.

## Configuración de impresión

Para poder modificar como se genera la impresión.

### Capas y perímetros

Para configurar las capas externas, las que _protegen_ la pieza.

Se puede jugar con meter más perímetro vs relleno para ahorrar tiempo y material.

Posición de la costura: donde se unen las capas. Puede ser útil modificarlo para evitar esa "cicatriz", que puede ser para que se vea más bonita y menos fragil.
En la leyenda podemos activar "costuras" para ver donde las ha puesto.

Carcasas verticales, modo vaso: para hacer piezas huecas. Progresa en espiral de manera contínua.
No muy útil, solo para hacer "vasos".

### Relleno

Giroide (honeycomb): el más común. Es más resistente y flexible.

Patrones de relleno. Los concéntricos son útiles para piezas redondas.

Combinar el relleno cada: para meter más capas exteriores, que tal vez nos permite ahorrar material de relleno.

### Material de soporte

Balsa: es la primera capa que se pone en algunas impresoras (Zortrax) para pegar bien la pieza a la base. No necesario en la Prusa.

Umbral de voladizos: a partir de cuanto desplome se pone soporte.
Capas más finas permitirán más ángulo de voladizo.
Recomendado poner a 0.

#### Opciones de material de soporte y balsa

Estilo: con esto podemos jugar para ver cual se adapta más. "Ajustado" parece el mejor. "Organico" intenta ahorrar material, pero depende del tipo de pieza puede que no sea lo mejor.

### Falda y balsa

Falda, para proteger la pieza del viento. No se suele usar.

La balsa puede ser útil para piezas altas, para darle más estabilidad.
