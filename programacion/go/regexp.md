https://golang.org/pkg/regexp/

import "regex"


re := regexp.MustCompile("http://funkyimg.com/p/.*jpg")
cadena := re.FindString(body_json.Bit)

MustCompile panic si no puede compilar la regexp
Tambien tenemos Compile que devuelve re,error

Compile("") devuelve una regex que hace match con todo.


re := regexp.MustCompile("(gopher){2}")
re.MatchString("gopher") // bool



re es *regexp.Regexp
