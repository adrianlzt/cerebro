https://flutter.dev/docs/development/ui/widgets


Existen widgets con estado (realizan acciones) y sin estado (por ejemplo un texto, un fondo, etc)

La función clave será "build", que debe ser un override de la clase de la que heredan.
Dentro de ese build retornaremos lo que queremos pintar, generalmente siempre partiremos de Scaffold

# StatelessWidget
class Header extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    throw UnimplementedError();
  }
}

# StatefulWidget
A stateful widget is dynamic: for example, it can change its appearance in response to events triggered by user interactions or when it receives data. Checkbox, Radio, Slider, InkWell, Form, and TextField are examples of stateful widgets

El estado se guarda en el objeto "State", que almacena los valores que pueden cambiar.
Cuando alguno de esos valores cambia, se llama a setState()

Crearemos un widget heredando de StatefulWidget y una clase que herede de State que almaenará el estado.
Si queremos que los cambios afecten a la visualización, tenemos que hacerlos dentro de la función setState()
La línea con las "keys": https://medium.com/flutter/keys-what-are-they-good-for-13cb51742e7d


class FavWidget extends StatefulWidget {
  const FavWidget({Key? key}) : super(key: key);

  @override
  _FavWidgetState createState() => _FavWidgetState();
}

class _FavWidgetState extends State<FavWidget> {
  int _count = 0;

  void onPressed() {
    setState(() {
      _count += 1;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        IconButton(onPressed: onPressed, icon: Icon(Icons.add)),
        Text("count: $_count")
      ],
    );
  }
}

## Manejo del estado
El estado suele ser gestionado de una de estas tres formas:
  - lo gestiona el propio widget (si es algo estético)
  - lo gestiona el parent (para datos de usuario, ejemplo: checkboxes, input text, etc)
  - un mix

En el caso de que sea el padre quien gestione el estado, le pasará ese estado como un parámetro al hijo.
También le puede pasar una función, si el hijo es el que tiene el botón y debe llamar a una función para que modifique el estado.

## Widgets con parámetros
class WithParam extends StatelessWidget {
  WithParam({Key? key, this.foo = 0}) : super(key: key);

  int foo;

  @override
  Widget build(BuildContext context) {
    return Text("valor: $foo");
  }
}

Para llamarlo:
WithParam(foo: 3),


Pasando una función al hijo:
void onPressed() { setState(() { _count += 1; }); }
...
Hijo(
    addOne: onPressed,
...

class WidParam extends StatelessWidget {
  WidParam({
    Key? key,
    required this.addOne,
  }) : super(key: key);

  final void Function() addOne; // también se puede escribir como "final VoidCallback addOne"

  @override
  Widget build(BuildContext context) {
    void _tap() {
      addOne();
    }
    ...





# Variables
Podemos definir variables definiendo widgets y luego usar estas variables en el return de build

Widget titleSection = Container(...)

Luego simplemente ponemos la variable donde la necesitemos, ejemplo:
body: Column(
  children: [
    titleSection,
  ],


# Condicionales
IconButton(
    icon: (_isFavorited ? const Icon(Icons.star) : const Icon(Icons.star_border)),
