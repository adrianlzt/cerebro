<https://modelcontextprotocol.io/introduction>

# Encontrar mcp-servers

<https://github.com/modelcontextprotocol/servers>
<https://mcp.so/> Permite testear los servidores desde la propia web.
<https://github.com/topics/mcp-server>
<https://mcpsvr.com/>
<https://github.com/punkpeye/awesome-mcp-servers>

# Servidores oficiales

<https://github.com/modelcontextprotocol/servers>

Si queremos modificar alguno, clonar el repo, hacer las modificaciones, build `npm run build`.

Para usarlo `node dist/index.js`

# Clientes

## goose

cli y x11. Parece que similar a aider, pero permite meter MCP.

mirar en goose.md

## mcp inspector

<https://github.com/modelcontextprotocol/inspector>

Visual testing tool for MCP servers

Levanta una web para poder llamar a cualquier servidor MCP.

```bash
npx @modelcontextprotocol/inspector uvx mcp-server-time
```

## cli

### chrishayuk/mcp-cli

Nos da un ncurses tipo chat donde, por defecto, con gpt-4o-mini podemos probar una tool.

```bash
uvx git+https://github.com/chrishayuk/mcp-cli chat --config-file ~/.config/Claude/claude_desktop_config.json --server mcp-server-time
```

2025-03-24: no me funciona con upx, pero si clonando y con uv run.

Si queremos añadir más servers podemos usar mcp-get (que los añadirá al fichero de config).

Comandos:

```
/tools --all
```

### wong2/mcp-cli

<https://github.com/wong2/mcp-cli>

Abre una app interactiva para ver los métodos y llamar al que queramos.

```bash
npx @wong2/mcp-cli npx -y @modelcontextprotocol/server-everything
```

### mcpgod

<https://github.com/mcpgod/cli>

Ver las tools que ofrece un MCP server y poder ejecutarlas.

No hace uso de ningún fichero de configuración, hace las ejecuciones directamente.

Tengo un par de PRs para poder correr servers python (<https://github.com/mcpgod/cli/pull/3>) y formatear el output en JSON (<https://github.com/mcpgod/cli/pull/4>). Esperando nueva release: <https://github.com/mcpgod/cli/issues/5>

```bash
npx -y mcpgod tools @modelcontextprotocol/server-everything
```

Usar una tool:

```bash
npx -y mcpgod tool @modelcontextprotocol/server-everything add a=59 b=40
```

### mcp-get

<https://github.com/michaellatman/mcp-get>

Para instalar servers localmente. Usa un registry.

Configura el fichero `~/.config/Claude/claude_desktop_config.json`

Listar servers (podemos instalar desde el ncurses que abre):

```bash
npx -y @michaellatman/mcp-get@latest list
```

## nvim / mcp-hub

<https://github.com/ravitemer/mcp-hub>
<https://github.com/ravitemer/mcphub.nvim>

mirar vim/ncp.md

Genera ficheros sqlite en cada directorio donde abro el vim.

# Desarrollo

## python

<https://github.com/modelcontextprotocol/python-sdk>

<https://github.com/jlowin/fastmcp>
