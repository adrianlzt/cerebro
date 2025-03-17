<https://github.com/ravitemer/mcphub.nvim>

A powerful Neovim plugin for managing MCP (Model Context Protocol) servers.

Nos da una forma sencilla de interactuar con MCP servers mediante una UI en vim.
Podemos ver e instalar nuevos servers, arrancarlos, etc.

Para abrir la interfaz:

```
:MCPHub
```

Desde la interfaz podemos instalar nuevos servers MCP.

# mcp-hub

<https://github.com/ravitemer/mcp-hub>

A centralized manager for Model Context Protocol (MCP) servers with dynamic server management and monitoring

Instalado con:

```bash
sudo npm install -g mcp-hub@latest
```

Fichero de config en `~/.config/mcpservers.json`

Arrancar con:

```bash
mcp-hub --port 3000 --config ~/.config/mcpservers.json
```

Para acceder se usa una REST API: <https://github.com/ravitemer/mcp-hub?tab=readme-ov-file#rest-api>

Para usarlo de forma más sencilla, usar la integración con neovim.
