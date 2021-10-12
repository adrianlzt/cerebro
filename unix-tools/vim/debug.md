Meter lineas de "debug" en la config:
:echom "mensaje"
  persistente. Podemos consultar luego el mensaje con :messages
:echo "the value of 'shell' is" &shell


Arrancar nvim traceando todo lo que carga con tiempos
nvim --startuptime log main.go

Arrancar sacando errores al fichero "out"
nvim -V2out main.go

Se puede subir el número hasta 9 para tener más debug


Si tenemos problemas ejecutar
:checkhealth
