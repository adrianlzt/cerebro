https://dart.dev/codelabs/async-await

Para usarlo desde widgets
https://stackoverflow.com/questions/53800662/how-do-i-call-async-property-in-widget-build-method/53805983

Dos opciones:
 - build() expects a sync result, so using async/await is inappropriate in build().
   Move the async code to initState() and update the state using setState when the value becomes available to have the build be executed again.
   Esto si estamos usando StatefulWidget

 - usar FutureBuilder https://api.flutter.dev/flutter/widgets/FutureBuilder-class.html
   https://stackoverflow.com/a/53805983/1407722




Ejemplo con FutureBuilder.

Función async:
  Future<String>_getData() async {
    return "foo";
  }

En el widget, el body para renderizar:
        body: FutureBuilder<String>(
            future: _getData(),
            builder: (context, snapshot) {
              if (snapshot.hasData) {
                return Text(snapshot.data!);
              } else if (snapshot.hasError) {
                return Text("${snapshot.error}");
              }
              return CircularProgressIndicator();
            },
        )

