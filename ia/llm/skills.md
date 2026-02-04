<https://agentskills.io/>
<https://news.ycombinator.com/item?id=46871173>

Ficheros usados para enseñar cosas a agentes LLM.

El esquema típico parece ser que el agente escanea un directorio con ficheros markdown, cargando solo en el contexto el "frontmatter", un pequeño resumen de la skill.

Luego el agente, si necesita eso, carga todo el fichero.

Ejemplo de lo que se pasaría al contexto:

```xml
<available_skills>
  <skill>
    <name>pdf-processing</name>
    <description>Extracts text and tables from PDF files, fills forms, merges documents.</description>
    <location>/path/to/skills/pdf-processing/SKILL.md</location>
  </skill>
  <skill>
    <name>data-analysis</name>
    <description>Analyzes datasets, generates charts, and creates summary reports.</description>
    <location>/path/to/skills/data-analysis/SKILL.md</location>
  </skill>
</available_skills>
```

# Generar skills

<https://github.com/huggingface/upskill>

Generate and evaluate agent skills for code agents like Claude Code, Open Code, OpenAI Codex
