### Bucles ###
for i:=0; i<10; i++ {
  fmt.Println("vuelta",i)
}
 
sum := 1
for ; sum < 1000; {
  sum += sum
}
 
While es for en Go (el for sin pre y post condiciones, y sin punto y coma):
for sum < 100 {
  cosa
}
 
Bucle forever:
for {
}

Bucle sobre un array (i va valiendo 0,1,2. v valiendo 1,5,10):
pow = []int {1,5,10}
for i, v := range pow { }
range hace un retorno de dos valores, en el primero te pasa el índice por donde va iterando (empezando en 0) y en el segundo el valor
v es el valor devuelto. No se puede usar como un puntero para poner el valor en el array.

# Channels
The loop for i := range c receives values from the channel repeatedly until it is closed.
Para este loop es necesario que el escritor cierre el canal, si no el for no sabrá cuando terminar.

Veo a veces que cuando se usa range se pone de este modo:
  _, variable := range lista

El primero valor que descartamos es el indice: 0,1,2,3...


# Control
break, termina el bucle
continue, sigue con la proxima vuelta
