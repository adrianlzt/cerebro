https://github.com/gi-dellav/zerostack
https://news.ycombinator.com/item?id=48164287

Minimalistic coding agent written in Rust, optimized for memory footprint and performance

El claim de ser ligero me llama, pero le veo muchas limitaciones.

# Install

```bash
cargo install zerostack
```

Para tener sandboxing de comandos bash usar:
```bash
paru -S bubblewrap
```

# Config

```
$HOME/.config/zerostack/config.json
```

# Cosas que hecho en falta / problemas

Interpolación de variables de entorno? Para no tener que poner las API keys en el fichero de config.

No tiene herramienta para preguntar al usuario?

Como crear custom tools? google-search

Subagents para investigar?

Interpolación de variables de entorno. Útil para configurar MCPs (pasar api keys en headers)

Como cargar skills? google chrome

Usar jsonc para el fichero de configuración

No se pueden activar/desactivar MCPs? Tener todos es un gasto enorme

La seguridad configurada parece que deja bastante que desear: https://github.com/gi-dellav/zerostack/issues/12

No se pueden ejecutar herramientas directamente

sesiones como json files. Mucho mejor sqlite como opencode

No usa readline? Control+u borrar línea, control+a comienzo línea, etc
