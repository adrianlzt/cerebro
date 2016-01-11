http://blog.golang.org/gobs-of-data

transmit a data structure across a network or to store it in a file

https://www.socketloop.com/tutorials/golang-saving-and-reading-file-with-gob


package main

import "os"
import "fmt"
import "encoding/gob"

func main() {
  // escrbir
  dataFile,_ := os.Create("integerdata.gob")
  dataEncoder := gob.NewEncoder(dataFile)
  dataEncoder.Encode("hola")
  dataFile.Close()

  // leer
  var data string
  dataFileR,_ := os.Open("integerdata.gob")
  dataDecoderR := gob.NewDecoder(dataFileR)
  dataDecoderR.Decode(&data)

  fmt.Printf("data: ")
  fmt.Printf(data)
}
