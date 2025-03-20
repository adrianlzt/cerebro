Si falla un programa eBPF podemos subir el nivel de debug:

```c
b = BPF(text=prog, debug=4
```

Podemos pasarle la salida a un LLM para intentar encontrar el problema.
