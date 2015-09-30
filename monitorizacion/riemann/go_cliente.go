package main

import (
    "github.com/bigdatadev/goryman"
)

func main() {
  c := goryman.NewGorymanClient("localhost:5555")
  err := c.Connect()
  if err != nil {
      panic(err)
  }

  err = c.SendEvent(&goryman.Event{
      Host: "pepeGO",
      Service: "moargore",
      Metric:  100,
      Tags: []string{"nonblocking"},
  })
  if err != nil {
      panic(err)
  }

  defer c.Close()
}
