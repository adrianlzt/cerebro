https://flutter.dev/docs/development/ui/layout

Para crear un layout debemos partir de una imagen y mirar:
    Identify the rows and columns.
    Does the layout include a grid?
    Are there overlapping elements?
    Does the UI need tabs?
    Notice areas that require alignment, padding, or borders.


Generalmente partiremos de un Widget MaterialApp del que colgará todo el resto, lo enlazamos con la propiedad "home".
https://api.flutter.dev/flutter/material/MaterialApp-class.html

Y luego típicamente usaremos Scaffold, para poner una barra superior y un fondo.
Pasaremos el resto de cosas en el body de ese Scaffold.

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Berry',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Home'),
        ),
        body: const Center(
          child: Text('Hello World'),
        ),
      ),
    );
  }
}

Scaffold widget
  default banner
  background color
  has API for adding drawers, snack bars, and bottom sheets

Tipos donde podemos meter varios hijos:
  Row: organizar cosas en horizontal
  Column: organizar cosas en vertical
  ListView: una mejora sobre column, hace scroll automáticamente
  ListTile: una mejora sobre row, permitiendo gestionar propiedades especiales para el primer y último elemento (max 3 lineas de texto)
  Stack: nos permite que los widgets se pongan unos encima de los otros
  GridView: malla MxN scrollable

container: nos permite definir parámetros para un child: padding, margins, borders, background color, etc
new Container(
  alignment: Alignment.center,
  margin: EdgeInsets.only(
    top: 50.0
  ),
  child: ...

Los layout widgets más típicos
https://flutter.dev/docs/development/ui/layout#common-layout-widgets

Todos los tipos de layout widgets
https://flutter.dev/docs/development/ui/widgets/layout


# Align / alineamiento
https://flutter.dev/docs/development/ui/layout#aligning-widgets

https://api.flutter.dev/flutter/rendering/MainAxisAlignment-class.html
mainAxisAlignment: la dirección principal del widget (horizontal para un row, vertical para un column)
    center
    end
    spaceAround
    spaceBetween
    spaceEvenly
    start
    values

https://api.flutter.dev/flutter/rendering/CrossAxisAlignment-class.html
crossAxisAlignment: la opuesta a la main
    baseline
    center
    end
    start
    stretch
    values


# Sizing / tamaño
https://flutter.dev/docs/development/ui/layout#sizing-widgets

Usamos expanded (https://api.flutter.dev/flutter/widgets/Expanded-class.html) para rellenar el espacio del row/column.
Parámetro "flex", para determinar si queremos que un elemento de los hermanos sea más grande (por defecto 1, poner 2 es el doble de grande)
