https://golang.org/pkg/regexp/

import "regexp"


re := regexp.MustCompile("http://funkyimg.com/p/.*jpg")
cadena := re.FindString(body_json.Bit)

MustCompile panic si no puede compilar la regexp
Tambien tenemos Compile que devuelve re,error

Compile("") devuelve una regex que hace match con todo.


re := regexp.MustCompile("(gopher){2}")
re.MatchString("gopher") // bool



re es *regexp.Regexp


line := " 28412:20190611:213255.526 In DCmass_update_triggers()"
zbxLineRegexp := regexp.MustCompile("^ ([0-9]+):([0-9]{8}:[0-9]{6}.[0-9]{3}) (In|End of) ([a-zA-Z_]*)\\(\\).*$")
fmt.Printf("%q\n", zbxLineRegexp.FindStringSubmatch(line))

[" 28412:20190611:213255.526 In DCmass_update_triggers()" "28412" "20190611:213255.526" "In" "DCmass_update_triggers"]

