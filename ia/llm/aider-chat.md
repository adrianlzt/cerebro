# aider-chat

<https://aider.chat/>

Estoy usando el modelo azure/gpt4o usando la API key de Github.

Agente SWE (software engineering)

Definir las variables de entorno.
Luego arrancar `aider`.

Nos permite chatear con distintos LLMs.
Si el LLM quiere generar un fichero, aider nos ayudar a crearlos, instalar dependencias, ejecutar la aplicación, etc.

Para poder cargar páginas web tenemos que instalar aur/playwright.
<https://aider.chat/docs/install/optional.html#enable-playwright>

Podemos pasarle ficheros al arrancar:

```bash
aider file1 file2 ...
```

Podemos añadirlos a posteriori con:

```
/add file1
```

Ask for changes:
Add new features or test cases.
Describe a bug.
Paste in an error message or or GitHub issue URL.
Refactor code.
Update docs.

Para obtener ayuda:

```
/help <question>
```

Para prompt multilínea:

```
{
aquí ya podemos hacer
multilínea
}
```

## Models

Podemos usar los modelos del marketplace de github gratuitamente con ciertas limitaciones.

<https://aider.chat/docs/llms.html>

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

## Config

<https://aider.chat/docs/config/aider_conf.html>

Se puede crear un fichero .aider.conf.yml en el directorio de trabajo, root del git o en el home.
