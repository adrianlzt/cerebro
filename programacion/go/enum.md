https://blog.learngoprogramming.com/golang-const-type-enums-iota-bc4befd096d3

Usar iota para rellenar

Ejemplo de enums con un tipo String() custom

package main

import "fmt"

type TriggerPriority int

const (
  triggerA TriggerPriority = iota
  triggerB
  triggerC
  pepe = "asd"
)

func (t TriggerPriority) String() string {
  switch t {
  case triggerA:
    return "A"
  case triggerB:
    return "B"
  case triggerC:
    return "C"
  default:
    return "no"
  }
}

func main() {
  fmt.Printf("%v\n", triggerA)
  fmt.Printf("%v\n", triggerB)
}
