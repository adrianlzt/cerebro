claude-code.md
gemini-cli.md
octofriend.md
qwen-code.md

aider
ia/llm/aider-chat.md

gemini-cli.md

<https://github.com/openai/codex>
el de openai
Un poco rollo que pide confirmación para cada comando. No hace lo típico de "permitir todos los comandos 'XX *'"

<https://block.github.io/goose/>
ia/llm/goose-agent.md

<https://github.com/Fosowl/agenticSeek>

<https://github.com/FoundationAgents/OpenManus>

claude-code.md

# Comparativa

Intento crear una aplicación web para anotar vías de escalada con las distintas opciones.
Todos usando gemini/gemini-2.5-pro-preview-05-06

A priori, intentar usar agenticSeek o OpenManus es mucho más complejo, requiere mucho setup.

aider, goose y codex parecen más simples.

Aider parece que tiene una integración más fuerte con git.
Codex lo sugiere.

Aider directamente se pone a picar código (podría usar /ask si no lo quisiera, aunque tiende a intentar generar código directamente si no se lo pides).
Me ha hecho un index.html medio vacío. Reintento especificando que debe ser react + tailwind css.
codex parece que lo primero que hace es intentar recabar más información. Genera unas preguntas para que completes lo que quieres hacer.
goose ha hecho una especie de resumen por puntos de lo que sería la app, conceptual design le ha llamado, y se queda ahí. No sugiere siguientes pasos.

goose es raro que no sabes cuando está pensando, le falta el típico spinner. Si le das un enter de más te lo guarda para la siguiente pregunta, no es muy intuitivo.
No entiendo que pasa, pero cuando vuelvo a mirar están canceladas las llamadas a las tools.
Ha generado la app, aunque no con react, es bastante fea, no mobile first y no funciona el poner iconos.

codex no funciona bien usando gemini via litellm. Falla al llamar a herramientas. Probando con gpt-4.1
codex, no veo que genere ningún fichero.

Parece que ninguno obtiene unos resultados ni mínimamente cercanos a lo que hacen las soluciones online (v0, getmocha, spark, etc).

# Opencode

Parecen bastante verdes ambos aún.

## SST

<https://github.com/sst/opencode>

fork de <https://github.com/opencode-ai/opencode> que parece que coje más tracción que el original

Config: ~/.local/share/opencode/auth.json

No soporta "openai compatible provider"?
<https://github.com/sst/opencode/issues/46>

Van a reescribir el backend de go a typescript.
Junio 2025, están en plena reescritura: <https://github.com/sst/opencode/pull/38>

## Opencode-ai

<https://github.com/opencode-ai/opencode>

Tampoco soporta "openai compatible provider"
<https://github.com/opencode-ai/opencode/pull/216>
<https://github.com/opencode-ai/opencode/issues/183>
