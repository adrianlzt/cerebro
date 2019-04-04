https://golang.org/pkg/os/

mirar tambien ioutil.md
mirar abajo unix

file, err := os.Open("file.go") // For read access.
if err != nil {
	log.Fatal(err)
}


# Crear directorio
import "os"
func MkdirAll(path string, perm FileMode) error


# Variables entorno
coso := os.Getenv("PRUEBA")
if coso == "" {
  coso = "default"
}

os.Setenv("FOO", "1")


# ListDir (aunque es de ioutil)
files, err := ioutil.ReadDir("./")
if err != nil {
    log.Fatal(err)
}

for _, f := range files {
        fmt.Println(f.Name())
}

# File not exists
Podemos usar unix.Access (mirar abajo)
filename := "a-nonexistent-file"
if _, err := os.Stat(filename); os.IsNotExist(err) {
  fmt.Printf("file does not exist")
}

Para file exist podemos hacer:
if _, err := os.Stat(filename); err == nil {





# Unix
https://godoc.org/golang.org/x/sys/unix

unix.Access("/etc/passwd", unix.W_OK)
  retorna error != nil si no se tienen esos permisos
  tambien dará error, otro distinto, si el fichero no existe
Errores:
  no such file or directory
  permission denied
