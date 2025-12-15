CLI de Gemini para programar usando modo agentic

Config: ~/.gemini/settings.json

Almacena la auth en .gemini/google_account_id y .gemini/oauth_creds.json

# Include directories

Podemos usar:

```bash
gemini --include-directories /foo,/bar
```

Para darle acceso a ficheros fuera del CWD.

También podemos hacerlo dentro de la cli:

```
/directory add /foo
```

Para mostrar los configurados:

```
/directory show
```

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

# mcp

```bash
gemini mcp list
```

Instalar un MCP sin tener que configurarlo en el settings:

```bash
gemini mcp add chrome-devtools npx chrome-devtools-mcp@latest
```

Borrar:

```bash
gemini mcp remove chrome-devtools
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

O también hacer un build de una imagen y usar:

```bash
gemini --sandbox --sandbox-image gemini-cli-foo
```

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

# checkpoints

<https://github.com/google-gemini/gemini-cli/blob/main/docs/checkpointing.md>

Automatically saves a snapshot of your project's state before any file modifications are made by AI-powered tools. This allows you to safely experiment with and apply code changes, knowing you can instantly revert back to the state before the tool was run.

A Git Snapshot: A commit is made in a special, shadow Git repository located in your home directory (~/.gemini/history/<project_hash>). This snapshot captures the complete state of your project files at that moment. It does not interfere with your own project's Git repository.

# Sessions / chat / checkpoints

Podemos guardar "checkpoints" de los chats para volver luego a ellos:

```
/chat list TAG
/chat save TAG
/chat load TAG
```

Están asociados al directorio donde ejecutamos el comando.

Si queremos reusar un checkpoint en otro directorio, podemos arrancar el comando en el dir que lo queremos, ver el ultimo dir que se crea en ~/.gemini/tmp y copiar el checkpoint-TAG.json desde el otro directoro.

# Debug / troubleshooting

```bash
DEBUG=1 gemini
```

# Github actions

<https://github.com/google-github-actions/run-gemini-cli>

Configurar gemini-cli como una github action.

Dentro del repo git:

```bash
gemini
/setup-github
```

Nos crea el dir `.github/`, lo comiteamos y pusheamos.

A partir de ese momento, para cada issue nos la etiqueta y cada PR la analiza.

Podemos pedirle cosas con:

```
@gemini-cli do this
```

Primera prueba bastante mal. Usó mal una herramienta, salió con error y no reportó nada ni pudo continuar.
