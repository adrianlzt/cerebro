// go run fichero.go
package main

import (
    "fmt"
    "io/ioutil"
)

// Reading files requires checking most calls for errors.
// This helper will streamline our error checks below.
func check(e error) {
    if e != nil {
        panic(e)
    }
}

func main() {
    // Perhaps the most basic file reading task is
    // slurping a file's entire contents into memory.
    dat, err := ioutil.ReadFile("/tmp/dat")
    check(err)
    fmt.Print(string(dat))
}
