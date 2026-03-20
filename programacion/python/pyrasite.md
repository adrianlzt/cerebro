http://pyrasite.com/

pip install pyrasite

Ejecutar un programa python dentro de PID de python
pyrasite PID programa.py

```bash
pyrasite-shell PID
uvx --from pyrasite pyrasite-shell
```
Nos abre una shell para poder consultar varibales, modificar, etc


```bash
echo 0 | sudo tee /proc/sys/kernel/yama/ptrace_scope
```


Para modificar una función del programa en ejecucción:
```python
import main # el nombre del .py que este corriendo
def mifunc():
  print("hola")

main.funcOrig = mifunc
```
