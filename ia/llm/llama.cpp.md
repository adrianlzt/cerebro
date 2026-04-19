https://github.com/ggml-org/llama.cpp

https://news.ycombinator.com/item?id=47788385
porque no usar ollama

```bash
paru -S llama.cpp-hip # me falla
paru -S llama.cpp-vulkan # esto es más genérico, me ha funcionado bien
```

Compilación costosa.


# WebUI

```bash
llama-server -hf ggml-org/gemma-4-E4B-it-GGUF --port 8000
```

Interfaz web en localhost:8033
