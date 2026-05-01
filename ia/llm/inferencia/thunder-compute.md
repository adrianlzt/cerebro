Conectar a la instancia:
```bash
tnr connect 0
```

Esto también modifica el .ssh/config para poder hacer
```bash
ssh tnr-0
```

Una vez dentro.

Loguear en huggingface (necesario para ciertos modelos):
```bash
uv run --with huggingface_hub hf auth login --force --add-to-git-credential --token hf_XXX
```

Correr vLLM:

```bash
sudo apt update
sudo apt install -y tmux

# llama 3.1-base
HF_TOKEN="your_token_here" uv run --with vllm vllm serve meta-llama/Meta-Llama-3.1-8B --host 0.0.0.0 --port 8000 --trust-remote-code

# Olmo-3-1025-7B base
uv run --with vllm vllm serve allenai/Olmo-3-1025-7B  --host 0.0.0.0   --port 8000   --trust-remote-code
```


Para llama hace falta pasar un token read-only que podemos obtener en https://huggingface.co/settings/tokens


Script python para "chatear" con un modelo de generación de tokens: https://gist.github.com/adrianlzt/bb16ae5737c11567b08c5564d18f786f


Exponer puerto abierto a internet:
```bash
tnr ports forward 0 --add 8000
```

Quitar:
```bash
tnr ports forward 0 --remove 8000
```

Listar:
```bash
tnr ports list
```

# DeepSeek v4 flash

DeepSeek-V4-Flash-Base model is approximately 295 GB

```bash
uv run --with vllm vllm serve --kv-cache-dtype fp8 deepseek-ai/DeepSeek-V4-Flash-Base
```

(EngineCore pid=1368) AssertionError: DeepseekV4 only supports fp8 kv-cache format for now, got auto

4 bit:
```bash
uv run --with vllm vllm serve EnsueAI/DeepSeek-V4-Flash-Base-INT4
```


Tiempo estimado de arranque: 35-55 minutos


# Olmo-3-1025-7 base


Tiempo que tardó en arrancar: 4m20s

Time spent downloading weights for allenai/Olmo-3-1025-7B: 67.507208 seconds
Loading weights took 16.40 seconds

En total:
Model loading took 13.63 GiB memory and 88.890731 seconds

Compiling a graph for compile range (1, 2048) takes 14.60 s
torch.compile took 34.32 s in total
Initial profiling/warmup run took 2.47 s

Graph capturing finished in 34 secs, took 0.39 GiB
init engine (profile, create kv cache, warmup model) took 94.98 s (compilation: 34.32 s)
