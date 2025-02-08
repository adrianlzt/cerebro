Sustituto de "pip" escrito en rust, mucho más rápido.

uv venv
cd . (con zsh me funciona, ya que, si detecta un venv, lo carga)
source .venv/bin/activate
uv pip install hvac

Para usar los paquetes del sistema:
uv venv --system-site-packages

Instalar un requirements.txt reproduciendo como hubiese sido en una fecha determinada
uv pip install --exclude-newer 2020-01-01 -r requirements.txt

# Instalar uv

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

# Usar sin instalar / uvx

```bash
uvx -p /usr/bin/python aider-install
```

`uvx` es equivalente a `uv tool run`

# Tools

Instalar una tool en un venv aislado:

```bash
uv tool install ruff
```

Meterá el bin en /home/adrian/.local/bin/llm.
El venv en /home/adrian/.local/share/uv/tools/

Para atualizar:

```bash
uv tool upgrade ruff
```

Borrar:

```bash
uv tool uninstall ruff
```

# Proyecto

```bash
uv init
uv add LIB
uv run main.py
```

# Ejecutar scripts

## Pasando versión y deps

```bash
uv run --python 3.12 --with pandas python
```

## Declarar python y versiones en el fichero (Inline script metadata)

<https://packaging.python.org/en/latest/specifications/inline-script-metadata/#script-type>

```python
#!/usr/bin/env -S uv run
# /// script
# requires-python = ">=3.10"
# dependencies = [
#   "requests",
# ]
# ///
import requests

print(requests.get("https://eth0.me").text)
```

```bash
chmod a+x fichero.py
./fichero.py
```

# Docker

<https://docs.astral.sh/uv/guides/integration/docker/>

```bash
docker run ghcr.io/astral-sh/uv:debian-slim --help
docker run ghcr.io/astral-sh/uv --help
docker run ghcr.io/astral-sh/uv:alpine --help
```

## Dockerfile

```
COPY pyproject.toml uv.lock /app/
RUN uv sync --frozen
```
