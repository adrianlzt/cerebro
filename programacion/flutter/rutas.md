# Flutter 1.0
https://flutter.dev/docs/cookbook/navigation/navigation-basics

Me parece más sencillo que el sistema de flutter 2.0. Ese nuevo sistema parece que intenta gestionar mejor para las apps web

Para movernos a una nueva "ruta" (una nueva pantalla):
Navigator.push(context, MaterialPageRoute(builder: (context) => SecondRoute()));

Para volver a la anterior:
Navigator.pop(context);
