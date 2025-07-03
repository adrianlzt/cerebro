CLI de Gemini para programar usando modo agentic

Config: ~/.gemini/settings.json

# Memoria

Guarda datos en ~/.gemini/GEMINI.md

# MCP

https://github.com/google-gemini/gemini-cli/blob/main/docs/cli/configuration.md#:~:text=toolCallCommand%22%3A%20%22bin/call_tool%22-,mcpServers,-(object)%3A

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
