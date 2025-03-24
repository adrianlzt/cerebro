<https://block.github.io/goose/>
<https://github.com/block/goose>

An open-source, extensible AI agent that goes beyond code suggestions - install, execute, edit, and test with any LLM

Parece como aider, pero GUI.

Soporte para MCP.

Tiene extensiones para integrarse con git, memory, RAG, etc.
<https://block.github.io/goose/v1/extensions/>

# Config

~/.config/goose/config.yaml

Se puede usar también este comando para gestionar esa config:

```bash
goose configure
```

# Logs

~/.local/share/goose/

# Funcionamiento

Cuando abrimos una sesión y escribimos algo, lo primero que hace goose es enviar al texto al LLM para pedirle un resumen en 4 palabras.

Luego hace una segunda llamada.
Pasa el promp de sistema (<https://github.com/block/goose/blob/bf760fd630b9accd1eff63adba24798d6bf7413a/crates/goose/src/prompts/system.md?plain=1>) con la fecha y las tools (extensions).
Y pasa el prompt del usuario.
Y las herramientas que se pueden usar.
