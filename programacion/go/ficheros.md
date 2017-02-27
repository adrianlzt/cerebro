https://gobyexample.com/reading-files


# Leer
import "io/ioutil"
dat, err := ioutil.ReadFile("/tmp/dat")
dat es []byte

Mirar fichero.go


Fichero almacenado en un slice por lineas
mounts, err := ioutil.ReadFile("/proc/mounts")
mounts_by_line := strings.Split(string(mounts), "\n")

# Escribir
https://gobyexample.com/writing-files

d1 := []byte("hello\ngo\n")
err := ioutil.WriteFile("/tmp/dat1", d1, 0644)
if err != nil {
  panic(err)
}

## Append
Crea el fichero si no existe

f, err := os.OpenFile(filename, os.O_CREATE|os.O_APPEND|os.O_WRONLY, 0600)
if err != nil {
    panic(err)
}

defer f.Close()

if _, err = f.WriteString(text); err != nil {
    panic(err)
}

# Temporal
https://golang.org/pkg/io/ioutil/#TempFile

	tmpfile, err := ioutil.TempFile("", "example")
	if err != nil {
		log.Fatal(err)
	}
	defer os.Remove(tmpfile.Name()) // clean up

	if _, err := tmpfile.Write(content); err != nil {
		log.Fatal(err)
	}
	if err := tmpfile.Close(); err != nil {
		log.Fatal(err)
	}

Podemos cerrar el fichero y luego leerlo, pero si hacemos el defer lo borramos.
