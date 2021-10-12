ReturnType nombreFunction(tipoParam nombreParam) {
    return xxx;
}


Variable para almacenar una función:
void pepe() {}

final void Function() foo = pepe;
O lo que es lo mismo (VoidCallback es un typedef de "void Function()"):
final VoidCallback foo = pepe;


Si es una función con parámetros:
void bar(bool int){}
final ValueChanged<bool> onChanged = bar;

ValueChanged está definido como:
typedef ValueChanged<T> = void Function(T value);



# Required params
const Scrollbar({Key? key, required Widget child})
