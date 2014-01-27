package main

import (
    "io"
    "os"
    "strings"
)

type MiError string

func (me MiError) Error() string {
    return "Errorrrr"
}

type rot13Reader struct {
    r io.Reader
}

func (r *rot13Reader) Read (p []byte) (n int, err error) {
    //func ReadFull(r Reader, buf []byte) (n int, err error)
    n,err = io.ReadFull(r,p)
    return 
}

func main() {
    s := strings.NewReader("Lbh penpxrq gur pbqr!")
    r := rot13Reader{s}
    io.Copy(os.Stdout, &r)
}
