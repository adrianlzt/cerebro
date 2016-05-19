https://gobyexample.com/reading-files


import "io/ioutil"
dat, err := ioutil.ReadFile("/tmp/dat")

Mirar fichero.go


Fichero almacenado en un slice por lineas
mounts, err := ioutil.ReadFile("/proc/mounts")
mounts_by_line := strings.Split(string(mounts), "\n")
