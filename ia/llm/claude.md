# Claude code

Prompts, plugins, etc
<https://www.aitmpl.com/agents>

Config: ~/.claude.json

CLI de Claude para programar usando modo agentic

Para poder conectar otros modelos:
<https://github.com/coffeegrind123/gemini-for-claude-code>
<https://github.com/musistudio/claude-code-router>

Arrancar con:

```bash
ccr code
```

Hace falta configurar ~/.claude-code-router/config.json
Donde ponemos que provider usamos y la transformación para que las llamadas de claude se conviertan al formato del provider que toque.

Ahora mismo no se puede usar con litellm proxy de por medio si no es con models openai: <https://github.com/musistudio/claude-code-router/issues/96#issuecomment-3031351638>

## Permisos

Cuando le decimos que a partir de ahora puede ejecutar tal comando, lo almacena en `.claude/settings.local.json`.

Si queremos quitar ese permiso, borrar de ese fichero lo que no queremos y arrancar de nuevo con:

```bash
claude --continue
```

## MCPs

<https://docs.claude.com/en/docs/claude-code/mcp>

stdio:

```bash
claude mcp add --transport stdio <name> <command> [args...]

claude mcp add --transport stdio chrome-devtools --scope user -- npx -y chrome-devtools-mcp@latest
```

Podemos cambiar de --scope para que sea solo del proyecto.

## router

<https://github.com/musistudio/claude-code-router> para poder modificar el modelo

Config `~/.claude-code-router/config.json`

# Claude desktop

Para Windows y OSx.

Para linux:
Arch: <https://aur.archlinux.org/packages/claude-desktop-native>
nix: <https://github.com/k3d3/claude-desktop-linux-flake>
Debian: <https://github.com/aaddrick/claude-desktop-debian>

Ficheros de config: ~/.config/Claude/

Ficheros de log: ~/.config/Claude/logs/
