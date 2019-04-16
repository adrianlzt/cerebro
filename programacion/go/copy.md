Si tenemos el puntero a un objeto e intentamos copiarlo:

web1,_ := url.Parse("http://www.1.com")
web2 := web1

Terminaremos con web1 y web2 siendo punteros a la misma dirección de memoria.

Si queremos un objeto nuevo haremos:
web3 := &url.URL{}
*web3 := *web1
Lo que hacemos es crear una nueva variable *url.URL y asignarle el valor de web1


https://play.golang.org/p/aBPtAviOkoO
