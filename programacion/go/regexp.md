https://golang.org/pkg/regexp/

import "regex"


re := regexp.MustCompile("http://funkyimg.com/p/.*jpg")
cadena := re.FindString(body_json.Bit)


re := regexp.MustCompile("(gopher){2}")
re.MatchString("gopher") // bool
