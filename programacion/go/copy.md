Si tenemos el puntero a un objeto e intentamos copiarlo:

web1,_ := url.Parse("http://www.1.com")
web2 := web1

Terminaremos con web1 y web2 siendo punteros a la misma dirección de memoria.

Si queremos un objeto nuevo haremos:
web3 := &url.URL{}
*web3 := *web1
Lo que hacemos es crear una nueva variable *url.URL y asignarle el valor de web1


https://play.golang.org/p/aBPtAviOkoO




https://stackoverflow.com/questions/56355212/deep-copying-data-structures-in-golang
Como regla general, no se puede hacer un "deep copy" en go.
Hay librerías que lo intentan (https://pkg.go.dev/github.com/getlantern/deepcopy) pero haciendo "apaños", esa en concreto, convirtiendo ida y vuelta a JSON.

Intentar implementar un "Copy()" en la propia librería, que conozca los tipos internos y los copie.
