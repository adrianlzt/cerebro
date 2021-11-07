debugPrint("foo: $bar")

Si ponemos prints en el código, los veremos en la consola al ejecutar flutter run

print("foo $bar")
If you output too much at once, then Android sometimes discards some log lines. To avoid this, use debugPrint(), from Flutter’s foundation library. This is a wrapper around print that throttles the output to a level that avoids being dropped by Android’s kernel.

https://flutter.dev/docs/testing/code-debugging
https://api.flutter.dev/flutter/dart-developer/log.html
import 'dart:developer' as developer;
developer.log('log me', name: 'my.app.category');


Para ver los logs:
Install:
flutter pub global activate devtools

Arrancar chrome con las devtools:
flutter pub global run devtools

La url que poner la vemos al arrancar una app con flutter run
