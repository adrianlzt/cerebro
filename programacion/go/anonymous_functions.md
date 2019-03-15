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
