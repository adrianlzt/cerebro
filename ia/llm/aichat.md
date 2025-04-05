<https://github.com/sigoden/aichat>

All-in-one LLM CLI tool featuring Shell Assistant, Chat-REPL, RAG, AI Tools & Agents, with access to OpenAI, Claude, Gemini, Ollama, Groq, and more.

Integración con MCP un toco "fea": <https://github.com/sigoden/llm-functions/tree/main/mcp/bridge>
Tienes que tener levantado un server de node que traduce entre un sistema local de tools que tiene.

Config: ~/.config/aichat/config.yaml

# Tools

<https://github.com/sigoden/llm-functions/>

Levanta un server web en :8808 con las functions.

~/.config/aichat/functions

Parece que tras hacer el:

```bash
argc build
```

Se genera un fichero functions.json que es el que usa aichat para llamar a las tools.
