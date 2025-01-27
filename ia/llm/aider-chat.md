# aider-chat

<https://aider.chat/>

Estoy usando el modelo azure/gpt4o usando la API key de Github.

Agente SWE (software engineering)

Para instalarlo:

```bash
uvx -p /usr/bin/python aider-install
```

Definir las variables de entorno.
Luego arrancar `aider`.

Nos permite chatear con distintos LLMs.
Si el LLM quiere generar un fichero, aider nos ayudar a crearlos, instalar dependencias, ejecutar la aplicación, etc.

Para poder cargar páginas web tenemos que instalar aur/playwright.
<https://aider.chat/docs/install/optional.html#enable-playwright>

Ask for changes:

- Add new features or test cases.
- Describe a bug.
- Paste in an error message or or GitHub issue URL.
- Refactor code.
- Update docs.

# Uso

Podemos pasarle ficheros al arrancar:

```bash
aider file1 file2 ...
```

Podemos añadirlos a posteriori con:

```
/add file1
```

O quitarlos con:

```
/drop fichero
```

Si queremos que genere un nuevo fichero, podemos meterlo con /add, aunque no exista.
Aunque normalmente él solo se encargará de generar el fichero y nos confirmará que queremos crearlo.

Para obtener ayuda: `/help <question>`

Para prompt multilínea (o arrancar con --multiline y enviar con alt+enter):

```
{
aquí ya podemos hacer
multilínea
}
```

Podemos usar `/editor` para editar el mensaje con nuestro $EDITOR.

Si queremos borrar el contexto hasta ahora: `/clear`

Si queremos ejecutar comandos:

```bash
!comando
/run comando
/test comando # parece que es como run pero que añade un prompt de que lo arregle listo para ejecutar
```

Podemos meter el contenido del clipboard con `/paste`

## Repomap

Por defecto aider envía un "repomap" del repo de git.
En repositorios muy grandes, o cuando sepamos que no nos hace falta ese contexto, podemos deshabilitarlo.

Si queremos deshabilitarlo podemos usar:

```
--map-tokens 0
```

Para repositorios grandes también podemos usar:
--subtree-only and .aiderignore

## Conventions

<https://aider.chat/docs/usage/conventions.html>

Si queremos añadir documentación podemos añadir un fichero como contexto con (será un fichero read-only):

```
/read fichero.txt
```

Podemos definir en `.aider.conf.yml` para que siempre lea uno o varios ficheros de este tipo.

Conventions propuestas por la comunidad: <https://github.com/Aider-AI/conventions/tree/main>

# Models

Podemos usar los modelos del marketplace de github gratuitamente con ciertas limitaciones.

<https://aider.chat/docs/llms.html>

Parece que lo más potente VS coste ahora mismo es:

```bash
aider --architect --model r1 --editor-model sonnet
```

Uno gratís y muy rápido:

```bash
aider --model groq/llama-3.3-70b-versatile
```

```bash
aider --list-models gemini/
```

Arrancar aider con un modelo concreto:

```bash
aider --model gemini/gemini-1.5-pro-latest
```

Para que funcione gemini hace falta instalar otro paquete (suponiendo que hemos isntalado aider-chat con pipx):

```
~/.local/share/pipx/venvs/aider-chat/bin/python -m pip install google
```

# Config

<https://aider.chat/docs/config/aider_conf.html>

Se puede crear un fichero .aider.conf.yml en el directorio de trabajo, root del git o en el home.

# Watch

<https://aider.chat/docs/usage/watch.html>

Modo de trabajo donde arrancamos aider como:

```bash
aider --watch
```

Y por otro lado editamos los ficheros.
Cuando guaramos algún fichero, aider busca comentarios tipo:

```
# AI comments
// AI comments
-- AI comments
```

O preguntas usando comentarios tipo:

```
# ... AI?
// ... AI?
-- ... AI?
```

Y actua en ese momento.

En el caso de las preguntas nos contestará en la shell donde tengamos aider.

Para lo otro realizará el cambio directamente en el código.
