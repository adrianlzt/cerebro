go build programa.go
  nos genera un binario programa


En ciertos casos no genera un binario estático. Creo que es cuando parte del código está linkado a c
Mirar static.md


Debug de que está haciendo:
-x

Más verboso:
-v

Mostrar y no borrar el directorio de trabajo:
-work


# Tener un build.go que gestione todo los pasos
Ejemplo: https://github.com/grafana/grafana/blob/master/build.go
