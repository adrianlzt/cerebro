https://golang.org/pkg/os/

mirar tambien ioutil.md

file, err := os.Open("file.go") // For read access.
if err != nil {
	log.Fatal(err)
}


# Crear directorio
import "os"
func MkdirAll(path string, perm FileMode) error

