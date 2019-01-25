https://golang.org/ref/spec#Logical_operators
and -> &&
or -> ||
not -> !

if a<3 && b<2 {
  ...
} else if (b==2) {
  ...
} else {
  ...
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



# Switch para chequear type de un interface{}
https://tour.golang.org/methods/16

switch v := (*val).(type) {
case string:
	tags[col] = v
case []byte:
	tags[col] = string(v)
case int64, int32, int:
	tags[col] = fmt.Sprintf("%d", v)
default:
	log.Println("failed to add additional tag", col)
}

El "truco" es que va probando cada uno de las posibilidades del switch en el "(type)". Lo primero probaría: (*val).(string). Si esa conversión es válida, hace el tags[col] = v (la v ya convertida en string)
