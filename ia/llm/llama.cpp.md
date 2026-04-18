https://github.com/ggml-org/llama.cpp

https://news.ycombinator.com/item?id=47788385
porque no usar ollama

```bash
paru -S llama.cpp-hip
```

Compilación costosa.


# WebUI

```bash
llama-server -hf ggml-org/gpt-oss-20b-GGUF --jinja -c 0 --host 127.0.0.1 --port 8033
```

Interfaz web en localhost:8033
