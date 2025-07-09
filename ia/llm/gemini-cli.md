CLI de Gemini para programar usando modo agentic

Config: ~/.gemini/settings.json

Almacena la auth en .gemini/google_account_id y .gemini/oauth_creds.json

# Memoria

Guarda datos en ~/.gemini/GEMINI.md

# MCP

<https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/configuration.md#:~:text=toolCallCommand%22%3A%20%22bin/call_tool%22-,mcpServers,-(object)%3A>

```json
"mcpServers": {
  "myPythonServer": {
    "command": "python",
    "args": ["mcp_server.py", "--port", "8080"],
    "cwd": "./mcp_tools/python",
    "timeout": 5000
  },
}
```

# Sandbox

<https://github.com/google-gemini/gemini-cli/blob/main/docs/sandbox.md>
<https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/configuration.md#sandboxing>

Usa docker o podman para correr gemini-cli dentro.

Probar con:

```bash
gemini-cli -s -p "run shell command 'env | grep SANDBOX' and 'mount | grep workspace'"
```

Podemos configurar la imagen en `.gemini/sandbox.Dockerfile`

Por defecto usa: us-docker.pkg.dev/gemini-code-dev/gemini-cli/sandbox

Para usar ese Dockerfile arrancar con:

```bash
BUILD_SANDBOX=1 gemini -s
```

Parte de la "gracia" de correr en sandbox es usarlo con el modo --yolo

Monta estos directorios:

```
$PWD:$PWD
$HOME/.gemini:/home/node/.gemini
$HOME/.gemini:$HOME/.gemini
/tmp:/tmp
$HOME/.config/gcloud:$HOME/.config/gcloud:ro
```

`

# Debug / troubleshooting

```bash
DEBUG=1 gemini
```
