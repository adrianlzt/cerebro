if a<3 {
}

if !true {
  //negar condicion
}
 
Se le puede meter una precondición que se ejecuta antes de la comprobación (el scope de las variables creadas en la precondición será entre los corchetes de ese if)
if a:=math.Pow(2,var1); a<3 {
}

switch precondicion; variable { }
Ejemplo:
switch i {
case 1:
    fmt.Println("one")
case 2:
    fmt.Println("two")
default:
    panic("coso")
}

switch c:=func(); c {
  case "cosa":
    blabla
  case "otra":
    bleble
  default:
    blibli
}

Los break van implícitos. 
Si queremos que contínue ponemos: fallthrough

También podemos usarlos como largos if-elseif- usando switch sin variable (que equivale a poner true):
switch {
  case time.Now().Hour() < 12
    fmt.Println("morning")
  case time.Now().Hour() < 17
    fmt.Println("afternoon")
  default:
    fmt.Println("evening")
}
