# llm

<https://llm.datasette.io/en/stable/>

Estoy usando gemini-flash como modelo por defecto.

Para los modelos de openai, llamo a una instancia local de litellm que use los modelos de azure con la apikey de github.

```bash
uv tool install --with llm-gemini --with llm-jq --with llm-cmd --with llm-claude-3 --with llm-ollama --with llm-cmd-comp --with llm-deepseek llm
```

Actualizar, ejecutar el comando anterior pero con `install -U`.

Las credenciales se almacenan en ~/.config/io.datasette.llm/keys.json

# Uso

Prompt básico:

```bash
llm -m MODELO 'texto a analizar'
cat myscript.py | llm 'explain this code'
```

Generar scripts (-x saca solo el primer bloque de código):

```bash
llm -x "create a bash script that returns all the keys of type set in redis" > p.sh
```

<https://simonwillison.net/2024/Apr/8/files-to-prompt/>

```bash
uv tool install files-to-prompt
```

Si queremos pasar muchos ficheros:

```bash
files-to-prompt path/to/file_or_directory | llm -s "summarize these files"
```

Los mete con el formato:

```
nombre_fichero
---
contenido
---
nombre_otro_fichero
---
contenido
---
```

Continuar una conversación:

```bash
llm 'Give me 5 names'
llm -c 'More names'
```

Modo chat:

```bash
llm chat -m gemini-pro
```

Continuar una conversación pasada en un chat:

```bash
llm logs
llm chat --cid xxx
```

Si queremos definir un system protmp:

```bash
llm -s "prompt de system"
git diff | llm -s 'Describe these changes'
```

Histórico de chats:

<https://llm.datasette.io/en/stable/logging.html>

```bash
llm logs
llm logs -n 10
llm logs -n 0
llm logs --cid XXX
```

Para buscar en los logs:

```bash
llm logs -q 'cheesecake'
```

## Templates

<https://llm.datasette.io/en/stable/templates.html>

Almacenar un prompt de sistema:

```bash
llm -s 'write pytest tests for this code' --save pytest
```

Usarlo:

```bash
cat llm/utils.py | llm -t pytest
```

# Modelos

```bash
llm models
```

También podemos usarlos mediante su alias:

```bash
llm aliases
llm aliases set turbo gpt-3.5-turbo-16k

```

Definir el modelo por defecto:

```bash
llm models default gemini-1.5-flash-002
```

Opciones de los modelos:

```bash
llm models --options
```

## Gemini

```bash
llm install llm-gemini
llm keys set gemini
```

## Anthropic / Claude

```
llm install llm-claude-3
llm keys set claude
```

## OpenAI compatible APIs

<https://llm.datasette.io/en/stable/other-models.html#openai-compatible-models>

Podemos usar litellm para exponer una API compatible con OpenAI y por detrás llamar al modelo que queramos.

## Ollama

```bash
llm install llm-ollama
```

Modelos disponibles:

```bash
llm ollama list-models
```

```bash
llm -m gemma:2b "pregunta"
```

# Plugins

Añadir un nuevo plugin (añadiendo un nuevo módelo vía API):

```bash
llm install llm-gemini
```

# Embeddings

Generar embeddings:

```bash
llm embed -m text-embedding-004 -c 'hello world'
```

Devuelve un JSON con el embedding generado.

Podemos generar una sqlite con los emebddings:

```bash
llm embed-multi readmes --files . '*/README.md' -d embed.db -m text-embedding-004
```

Buscar contra los embeddings generados:

```bash
llm similar readmes -c 'upload csvs to stuff' -d embed.db
```

# Extras

## Contar tokens

```bash
cat my-file.txt | uvx ttok
```

## symbex / símbolos python

<https://github.com/simonw/symbex>
<https://simonwillison.net/2023/Jun/18/symbex/>

Symbex is a tool for searching for symbols in Python codebases. It’s useful for extracting just the code for a specific problem and then piping that into LLM for explanation, refactoring or other tasks.

```bash
symbex 'test*csv*' | llm --system 'based on these tests guess what this tool does'
```

Devuelve los ficheros con una cabecera tipo:

```
# File: setup.py Line: 5
```

Mostrar todos los métodos de todas las clases:

```bash
symbex '*.*'
```

## strip-tags / HTML

strip-tags is a command for stripping tags from HTML. This is useful when working with LLMs because HTML tags can use up a lot of your token budget.

```bash
curl -s https://www.nytimes.com/ \
  | strip-tags .story-wrapper \
  | llm -s 'summarize the news'
```

## jq

<https://github.com/simonw/llm-jq>

Versión donde especificamos que queremos en lenguaje natural.

```bash
llm install llm-jq
```

```
curl -s https://api.github.com/repos/simonw/datasette/issues | \
  llm jq 'count by user.login, top 3'
```

## llm-cmd

<https://github.com/simonw/llm-cmd>

Como lo de `gh copilot suggest -t shell`.

```bash
llm install cmd
```

```bash
llm cmd undo last git commit
```

Con <https://github.com/CGamesPlay/llm-cmd-comp> podemos empezar a escribir el comando
