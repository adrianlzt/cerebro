# Opencode

<https://opencode.ai/docs>

<https://github.com/anomalyco/opencode>

```bash
yay opencode-bin
```

Config: ~/.config/opencode/opencode.json

Credenciales: ~/.local/share/opencode/auth.json

Conectar con litell: <https://docs.litellm.ai/docs/tutorials/opencode_integration>

# Config

Configuration files are merged together, not replaced.

Config sources are loaded in this order (later sources override earlier ones):

Remote config (from .well-known/opencode) - organizational defaults

Global config (~/.config/opencode/opencode.json) - user preferences

Custom config (OPENCODE_CONFIG env var) - custom overrides

Project config (opencode.json in project) - project-specific settings

.opencode directories - agents, commands, plugins
Inline config (OPENCODE_CONFIG_CONTENT env var) - runtime overrides

# init

Usar el comando

```
/init
```

Para hacer un análisis del proyecto y generar el `AGENTS.md`. La recomendación es comitear ese fichero.

# Modelos

Mantiene una caché de modelos en:
```
~/.cache/opencode/models.json
```

# MCP

```bash
opencode mcp add            add an MCP server
opencode mcp list           list MCP servers and their status                        [aliases: ls]
opencode mcp auth [name]    authenticate with an OAuth-enabled MCP server
opencode mcp logout [name]  remove OAuth credentials for an MCP server
opencode mcp debug <name>   debug OAuth connection for an MCP server
```

```jsoc
opencode.jsonc
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "linear": {
      "type": "local",
      "command": ["npx", "-y", "mcp-remote", "https://mcp.linear.app/mcp"],
      "enabled": true
    }
  }
}
```

You can use variable substitution in your config files to reference environment variables and file contents

Use {env:VARIABLE_NAME} to substitute environment variable

## Remove MCP

Con OAuth:

```jsonc
    "jira": {
      // Para hacer el flujo de oauth
      // opencode mcp auth jira
      "type": "remote",
      "url": "https://mcp.atlassian.com/v1/mcp",
      "oauth": {},
      "enabled": false,
    },
```

# Imágenes / Images

No me queda claro si está actualmente soportado. Con glm-4.7

Se puede hacer drag&drop de imágenes. Pero el modelo debe soportar procesado de imágenes.

Parece que también se puede referenciar con `@`.

# Ficheros

Podemos hacer fuzzy search y buscar ficheros, para meterlos en el contesto usando `@`.

# Web

```bash
opencode web
```

Abre un navegador para hablar con opencode.

# share

Con el comando

```
/share
```

Podemos compartir con un link la conversación.

# undo / redo

Se pueden usar los comandos

```
/undo
/redo
```

Para deshacer el último cambio o rehacerlo.

Cuidado que cambios hechos con comandos (sed, awk), no se podrá deshacer.

# Tools

Si queremos mostrar la respuesta de una tool (las de MCP por defecto no se muestran):

Control+p / Show tool details

Se quedará almacenado la última configuración que hayamos usado.

# Plugins

<https://opencode.ai/docs/ecosystem/>

## OCX

Gestor de plugins

Hace falta tener bun:
```bash
paru -S bun
```

## pty

<https://github.com/shekohex/opencode-pty>

Para ejecutar programas en background.

Nos da una interfaz web donde podemos ver su estado e interactuar.

Opencode también puede interactuar con ellos.

Podemos usarlo para iniciar una sesión de debug, con "python -m pdb" por ejemplo.

```
# Tools
pty_spawn Create a new PTY session (command, args, workdir, env, title, notifyOnExit)
pty_write Send input to a PTY (text, escape sequences like \x03 for Ctrl+C)
pty_read Read output buffer with pagination and optional regex filtering
pty_list List all PTY sessions with status, PID, line count
pty_kill Terminate a PTY, optionally cleanup the buffer

# slash commands
/pty-open-background-spy Open the PTY web server interface in the browser
/pty-show-server-url Show the URL of the running PTY web server instance
```

## browser

<https://github.com/different-ai/opencode-browser/>

Una extensión para poder comunicar opencode con el navegador.

Hace falta una instalacion un poco manual.

Hay un script que ayudar a automatizarlo.

Me bajé el repo, instalé a mano el plugin en chrome, y ejecuté:

```bash
node bin/cli.js install --extension-id ncfalpcdanbcccbaakenefpokeioldgd
```

Crea este fichero $HOME/.config/google-chrome/NativeMessagingHosts/com.opencode.browser_automation.json

```json
{
  "name": "com.opencode.browser_automation",
  "description": "OpenCode Browser native messaging host",
  "path": "/home/adrian/.opencode-browser/host-wrapper.sh",
  "type": "stdio",
  "allowed_origins": [
    "chrome-extension://ncfalpcdanbcccbaakenefpokeioldgd/"
  ]
}
```

Usando el id de la extensión.

También crea ficheros en

```
$HOME/.opencode-browser
```

Las primeras pruebas no han sido muy buenas, no conseguía logarse en azure, usando GLM-4.7.

No se como funcionará con varios perfiles de chrome.

Parece que no tiene tool de snapshot que genere una imagen, creo que esto podría ser limitante.

# Database / histórico

Buscar en el histórico de todos los mensajes
```bash
sqlite3 .local/share/opencode/opencode.db "select slug,title,directory,s.time_created,data from part join session s ON part.session_id = s.id WHERE data like '%foo bar%' LIMIT 1;"
```

# Debug

```bash
opencode --print-logs --log-level DEBUG
```

# Develop

Bajar repo y ejecutar
```bash
bun install
bun dev
```

# Skills

https://opencode.ai/docs/skills/

Configuración del proyecto: .opencode/skills/<name>/SKILL.md

Configuración global: ~/.config/opencode/skills/<name>/SKILL.md

Compatible con Proyecto Claude: .claude/skills/<name>/SKILL.md

Compatible con Claude global: ~/.claude/skills/<name>/SKILL.md

Compatible con agente de proyecto: .agents/skills/<name>/SKILL.md

Compatible con agentes globales: ~/.agents/skills/<name>/SKILL.md

Ejemplo formato:
```
---
name: git-release
description: Create consistent releases and changelogs
license: MIT
compatibility: opencode
metadata:
  audience: maintainers
  workflow: github
---

## What I do

- Draft release notes from merged PRs
```

# Agents

https://opencode.ai/docs/agents/

Global: ~/.config/opencode/agents/

Por proyecto: .opencode/agents/


Ejemplo:
```markdown
---
description: Reviews code for quality and best practices
mode: subagent
model: anthropic/claude-sonnet-4-20250514
temperature: 0.1
tools:
  write: false
  edit: false
  bash: false
---

You are in code review mode. Focus on:

- Code quality and best practices
- Potential bugs and edge cases
- Performance implications
- Security considerations

Provide constructive feedback without making direct changes.
```
