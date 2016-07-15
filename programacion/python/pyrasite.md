http://pyrasite.com/

Ejecutar un programa python dentro de PID de python
pyrasite PID programa.py


pyrasite-shell PID
Nos abre una shell para poder consultar varibales, modificar, etc


echo 0 | sudo tee /proc/sys/kernel/yama/ptrace_scope



Para modificar una función del programa en ejecucción:
import main # el nombre del .py que este corriendo
def mifunc():
  print("hola")

main.funcOrig = mifunc
