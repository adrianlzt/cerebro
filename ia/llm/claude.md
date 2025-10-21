# Claude code

Prompts, plugins, etc
<https://www.aitmpl.com/agents>

Config: ~/.claude.json

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
