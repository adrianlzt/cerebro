https://gobyexample.com/reading-files


# Leer
import "io/ioutil"
dat, err := ioutil.ReadFile("/tmp/dat")

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
