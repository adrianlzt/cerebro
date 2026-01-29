<https://modelcontextprotocol.io/introduction>

# Encontrar mcp-servers

<https://github.com/modelcontextprotocol/servers>
<https://mcp.so/> Permite testear los servidores desde la propia web.
<https://github.com/topics/mcp-server>
<https://mcpsvr.com/>
<https://github.com/punkpeye/awesome-mcp-servers>
<https://glama.ai/mcp/servers>
<https://mcp.pipedream.com/>

Servidor online SSE para hacer pruebas
<https://demo-day.mcp.cloudflare.com/sse>

# Servidores oficiales

<https://github.com/modelcontextprotocol/servers>

Si queremos modificar alguno, clonar el repo, hacer las modificaciones, build `npm run build`.

Para usarlo `node dist/index.js`

# Tipos de conectividad

## stdio

## SSE

## HTTP stream

Prueba de conctividad básica:

```bash
curl -N -v -H "Accept: text/event-stream" http://localhost:9034/mcp
```

Luego lo más sencillo es usar el mc inspector.

# Clientes

## goose

cli y x11. Parece que similar a aider, pero permite meter MCP.

mirar en goose.md

## mcp inspector

<https://github.com/modelcontextprotocol/inspector>

Visual testing tool for MCP servers

Levanta una web para poder llamar a cualquier servidor MCP.

```bash
npx -y @modelcontextprotocol/inspector uvx mcp-server-time
```

Si queremos quitar el auth: DANGEROUSLY_OMIT_AUTH=true

Si queremos acceder remotamente, suponiendo que entramos por la ip 1.2.3.4:

```bash
ALLOWED_ORIGINS=http://100.64.0.1:6274 HOST=0.0.0.0 DANGEROUSLY_OMIT_AUTH=true npx -y @modelcontextprotocol/inspector XXX
```

## cli

### mcporter

<https://github.com/steipete/mcporter>
<https://github.com/steipete/mcporter/blob/main/docs/cli-reference.md>

Convert the chrome-devtools MCP to a CLI via this one weird trick:

```bash
npx mcporter generate-cli --command "npx -y chrome-devtools-mcp@latest"
```

MCPorter auto-discovers the MCP servers you already configured in Cursor, Claude Code/Desktop, Codex, or local overrides.

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
npx -y @wong2/mcp-cli npx -y @modelcontextprotocol/server-everything
```

Salta errores, Jul 2025

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

Parece importante dar bastante detalle en la description de las tools.

Ejemplo de como declaran la de "shell" en goose: <https://github.com/block/goose/blob/c11e357fb320c6799a7e337b62b32bd906118974/crates/goose-mcp/src/developer/mod.rs#L133>

## python

<https://github.com/modelcontextprotocol/python-sdk>

<https://github.com/jlowin/fastmcp>

## golang

<https://github.com/mark3labs/mcp-go>

# Debug

Parte del tráfico que se intercambia: <https://www.catiemcp.com/blog/mcp-transport-layer/>

<https://collabnix.com/mastering-mcp-debugging-with-cli-tools-and-jq/>

```bash
echo '{"jsonrpc":"2.0","method":"tools/list","id":1}' | npx -y @modelcontextprotocol/server-filesystem ~ | jq
```

Si queremos obtener los logs que se intercambian, usar esta app. Nos dejará el intermcambio en un fichero `mcp_session.log`:

```bash
uvx mcp-stdin-debug SERVER MCP
```
