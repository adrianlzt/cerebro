<https://github.com/sigoden/aichat>

All-in-one LLM CLI tool featuring Shell Assistant, Chat-REPL, RAG, AI Tools & Agents, with access to OpenAI, Claude, Gemini, Ollama, Groq, and more.

Integración con MCP un toco "fea": <https://github.com/sigoden/llm-functions/tree/main/mcp/bridge>
Tienes que tener levantado un server de node que traduce entre un sistema local de tools que tiene.

He encontrado un par de fallos a la hora de usar MCPs. No parece una integración muy bien hecha.

Config: ~/.config/aichat/config.yaml

# Tools

<https://github.com/sigoden/llm-functions/>

Levanta un server web en :8808 con las functions declaradas en `mcp.json`.

```bash
argc mcp start
```

Para meter las tools de mcp en las herramientas disponibles:

```bash
argc build
```

Se genera un fichero functions.json que es el que usa aichat para llamar a las tools.
