CLI de Claude para programar usando modo agentic

Para poder conectar otros modelos:
https://github.com/coffeegrind123/gemini-for-claude-code
https://github.com/musistudio/claude-code-router

Arrancar con:
```bash
ccr code
```

Hace falta configurar ~/.claude-code-router/config.json
Donde ponemos que provider usamos y la transformación para que las llamadas de claude se conviertan al formato del provider que toque.

Ahora mismo no se puede usar con litellm proxy de por medio si no es con models openai: https://github.com/musistudio/claude-code-router/issues/96#issuecomment-3031351638
