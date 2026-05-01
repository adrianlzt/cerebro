Conectar a la instancia:
tnr connect 0

Esto también modifica el .ssh/config para poder hacer
ssh tnr-0

Una vez dentro.

Loguear en huggingface (necesario para ciertos modelos):
uv run --with huggingface_hub hf auth login

Correr vLLM:

sudo apt update
sudo apt install -y tmux

uv run --with vllm vllm serve meta-llama/Meta-Llama-3.1-8B --host 0.0.0.0 --port 8000 --trust-remote-code



Exponer puerto abierto a internet:
tnr ports forward 0 --add 8000

Quitar:
tnr ports forward 0 --remove 8000

Listar:
tnr ports list
