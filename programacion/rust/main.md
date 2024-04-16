# Return values
La función main de rust puede devolver cualquier valor que implemente el trait `std::process::Termination`.
Ese trait tiene una función `fn report(self) -> i32` que devuelve un código de salida.
