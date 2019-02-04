http://www.golang-book.com

The Holy Reference: http://golang.org/ref/spec

Go by example: https://gobyexample.com/

https://github.com/adonovan/gopl.io.git

Some useful patterns: http://golang.org/doc/effective_go.html 

Some best practices: http://talks.golang.org/2013/bestpractices.slide 

Embedded documentation: godoc -http=:6060 & chrome http://localhost:6060

http://www.amazon.com/gp/product/0134190440/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=0134190440&linkCode=as2&tag=cyberciti-20&linkId=O24JHZPKBPTWRVU4

Videos: https://www.dotconferences.com/conference/dotgo


LearningGo.pdf
a2pi1.GoinAction.epub
goeg/
en ~/priv-adrianRepo/programacion/go/


De https://github.com/influxdata/influxdb/blob/master/CODING_GUIDELINES.md :
http://arslan.io/ten-useful-techniques-in-go
http://peter.bourgon.org/go-in-production/
https://inconshreveable.com/07-08-2014/principles-of-designing-go-apis-with-channels/
http://soryy.com/blog/2014/common-mistakes-with-go-lang/


Para documentar el código, escribir comentarios sobre la función.
https://blog.golang.org/godoc-documenting-go-code
Ejemplo:
// Fprint formats using the default formats for its operands and writes to w.
// Spaces are added between operands when neither is a string.
// It returns the number of bytes written and any write error encountered.
func Fprint(w io.Writer, a ...interface{}) (n int, err error) {
