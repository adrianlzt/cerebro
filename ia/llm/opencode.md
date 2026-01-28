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

# Web

```bash
opencode web
```

Abre un navegador para hablar con opencode.
