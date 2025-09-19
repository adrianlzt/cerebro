<https://llm.datasette.io/en/stable/>

Estoy usando gemini-flash como modelo por defecto.

Para los modelos de openai, llamo a una instancia local de litellm que use los modelos de azure con la apikey de github.

Instalar/actualizar:

```bash
uv tool install -U \
  --with llm-gemini  \
  --with llm-jq  \
  --with llm-cmd  \
  --with llm-claude-3  \
  --with llm-ollama  \
  --with llm-cmd-comp  \
  --with llm-deepseek  \
  --with llm-groq  \
  --with llm-cerebras \
  --with git+https://github.com/OttoAllmendinger/llm-git.git  \
  --with llm-github-models \
  --with llm-edit \
  --with llm-sentence-transformers \
  --with jsonschema \
  llm
```

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

Interfaz web para visualizarlo:

```bash
npx -y llm-web-ui $(llm logs path)
```

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

# Fragments

<https://llm.datasette.io/en/stable/fragments.html>

Añadir fragmentos (más texto) a una llamada a llm.
Estos fragmentos pueden user URLs, ficheros o extensiones custom (transcripción de youtube, un repo de github, etc).

```bash
llm -f https://llm.datasette.io/robots.txt "Explain this robots.txt file in detail"
llm -f setup.py 'extract the metadata'
```

Para ver fragmentos previamente añadidos:

```bash
llm fragments
```

## github

Cargar un repo de github como fragmento:

```bash
llm install llm-fragments-github
llm -f github:simonw/s3-credentials 'Suggest new features for this tool'
```

# Schemas

<https://llm.datasette.io/en/stable/schemas.html>

Allows you to define the exact structure of JSON data you want to receive from a model.

```bash
llm --schema 'name, age int, one_sentence_bio' 'invent a cool dog'
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

<https://llm.datasette.io/en/stable/embeddings/cli.html#embedding-data-from-files-in-directories>
Generar embeddings para todos los .md de un directorio:

```bash
llm embed-multi documentation \
  -m 3-small \
  --files docs '**/*.md' \
  -d documentation.db \
  --store
```

Buscar las collections que tenemos:

```bash
llm collections list
llm collections list -d database.db
```

Buscar contra los embeddings generados:

```bash
llm similar readmes -c 'upload csvs to stuff' -d embed.db
```

# Tools

<https://simonwillison.net/2025/May/27/llm-tools/>

Permitir ejecutar tools a los LM. Los LM solicitan ejecutar las tools y es `llm` quien las ejecuta localmente, devuelve el resultado y el LM da la respuesta.

Ejemplo básico (se puede usar también `-t`):

```bash
llm --tool llm_version "What version?" --td
```

Para ver a que tools está llamando el LLM y que se está contestando:

```bash
--td
--tools-debug
```

## Instalar tools

```bash
llm install llm-tools-simpleeval
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

# Plugins

Añadir un nuevo plugin (añadiendo un nuevo módelo vía API):

```bash
llm install llm-gemini
```

Se usan para añadir nuevos modelos o nuevas funcionalidades.

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

## llm-git

<https://github.com/OttoAllmendinger/llm-git>

Los más comunes:

```bash

llm git describe-staged
llm git commit
```

```bash
llm git [--model MODEL] commit [--no-edit] [--amend] [--add-metadata] [--extend-prompt TEXT] [--include-prompt] - Generate commit message and commit changes
llm git [--model MODEL] rebase [--upstream BRANCH] [--no-edit] [--extend-prompt TEXT] [--onto BRANCH] - Rebase the current branch with AI assistance
llm git [--model MODEL] create-branch [COMMIT_SPEC] [--preview] [--extend-prompt TEXT] - Generate branch name from commits and create it
llm git [--model MODEL] describe-staged [--extend-prompt TEXT] - Describe staged changes with suggestions
llm git [--model MODEL] apply INSTRUCTIONS [--cached] [--extend-prompt TEXT] - [BETA] Generate changes based on instructions (not fully functional yet)
llm git [--model MODEL] add [--extend-prompt TEXT] - [BETA] Generate and stage fixes (not fully functional yet)
llm git dump-prompts - Display all available prompts
GitHub Commands
llm github [--model MODEL] create-pr [--upstream BRANCH] [--no-edit] [--extend-prompt TEXT] - Generate PR description from commits
```

## llm-github-models

<https://github.com/tonybaloney/llm-github-models>

Poder usar los modelos del marketplace de github.

Listar los disponibles:

```bash
llm models | grep github
```

Usar

```bash
llm -m github/o1-mini "cuanto es 2+2"
```

## llm-edit

<https://github.com/ajac-zero/llm-edit/tree/main>

Crea o modifica un fichero según el prompt.
Como un "aider" super básico.

```bash
llm edit nombre.fichero lo que queremos hacer o cambiar
```
