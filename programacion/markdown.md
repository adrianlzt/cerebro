Sintaxis: <http://daringfireball.net/projects/markdown/syntax>

Typora, editor x11 simple WYSIWYG

<https://github.com/benjajaja/mdfried>
A markdown viewer for the terminal that renders images and big headers
aur/mdfried-bin

<https://markwhen.com/>
A markdown-like journal language for plainly writing logs , gantt charts , blogs , feeds , notes , journals , diaries , todos , timelines , calendars or anything that happens over time.

Online:
<http://dillinger.io/>
<https://stackedit.io/editor>
editar markdown almacenados en google drive

glow
<https://github.com/charmbracelet/glow>
Lector de markdown para la consola
Puede abrir URLs

```bash
uvx grip index.md fichero.md
```

monta un server en localhost:5000 mostrando el fichero
hace uso de la api de github

Para soporte de mermaid:

```bash
uvx --from git+https://github.com/nikolavp/grip@add-mermaid-support grip index.md
```

Otro server para mostrar markdowns, con soporte para mermaid:

```bash
npx mdts
```

markdown_py -f README.html -x tables README.md
app python para convertir markdown a html/xhtml. Tendremos que cargar extensiones para algunas cosas (-x)

<https://remarkjs.com/>
presentación de slides en markdown

To HTML
<https://github.com/mixu/markdown-styles>
yaourt -S nodejs-markdown-styles

# Sintaxis

# This is an H1

## This is an H2

# This is an H1

## This is an H2

###### This is an H6

> esto es una prueba
> con texto quotado
>
> ## This is a header
>
> 1. This is the first list item.
> 2. This is the second list item.
>
> Here's some example code:
>
>     return shell_exec("echo $input | $markdown_script");

Listas

- Uno
- Dos
- Tres
  - sublista

Tambien vale con \* y -

Lista ordenada

1. Cosa
2. Otra
3. Mas

Codigo (4 espacios en blanco)
return shell_exec("echo $input | $markdown_script");

`return shell_exec("echo $input | $markdown_script");`

```
multilinea de codigo
varias lineas
```

Linea horizontal

---

Links
This is [an example](http://example.com/ "Title") inline link.

Estilos (depende de quien lo renderice?):
_cursiva_
_otro_
**negrita**

Imagenes
![Alt text](/path/to/img.jpg "Optional title")

Texto pequeño
<sub><sup>texto</sup></sub>

# Linter

<https://github.com/igorshubovych/markdownlint-cli>

Si queremos ignorar ficheros ponerlos en `.markdownlintignore`.

Configurar reglas en `.markdownlint.yaml`.

Ejemplo: <https://github.com/DavidAnson/markdownlint/blob/main/schema/.markdownlint.yaml>

```yaml
MD013:
  # Number of characters
  line_length: 80
```
