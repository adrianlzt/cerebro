https://blog.denevell.org/golang-closures-anonymous-functions.html

También se llaman:
 func literal
 lambda

fn := func() {
    fmt.Println("hello")
}





anon := func(s name) string {
   return "Hiya, " + name
}
anotherFunction(anon)

Es equivalente a:

func anotherFunction(f func(string) string) {
   result := f("David")
   fmt.Println(result) // Prints "Hiya, David"
}



Cuidado con intentar capturar una variable de un bucle for.
https://eli.thegreenplace.net/2019/go-internals-capturing-loop-variables-in-closures/

ESTO ESTÁ MAL
```
for _, val := range values {
  go func() {
    fmt.Println(val)
  }()
}
```
Estará usando el último valor de val.

La típica solución es pasar la variable como parámetro:
```
for _, val := range values {
  go func(val string) {
    fmt.Println(val)
  }(val)
}
```

Pero si no pudiésemos, también podríamos redeclarar la variable, para evitar el efecto de que la variable "val" se está reusando.
Al declarar una nueva variable no tendríamos el problema:
