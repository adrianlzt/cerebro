mirar llama.cpp.md unsloth.md

Usar otra cosa:
https://news.ycombinator.com/item?id=47788385


<https://github.com/ollama/ollama/tree/main/docs>

<https://ollama.com/download>
pacman -S ollama
sc-start ollama

Por un par de pruebas, parece que consumen tanta memoria como el tamaño del fichero que hace falta descargar.

phi4: este se come 10GiB y va bastante lento. Pone la CPU a tope. Lento, pero parece razonablemente bueno con aider
deepseek-r1: el tema de razonar consume más tokens, y no es muy rápido, por lo que se hace un poco lento

Arrancar un modelo, nos abre un chat para poder preguntarle.
Seguirá arrancado si no lo paramos.

```bash
ollama run gemma:2b
```

Modelos corriendo:

```bash
ollama ps
```

Info modelo:

```bash
ollama show gemma:2b
```

Parar un modelo:

```bash
ollama stop gemma:2b
```

Cambiar el directorio para bajar los modelos: <https://github.com/ollama/ollama/blob/main/docs/faq.md#where-are-models-stored>
