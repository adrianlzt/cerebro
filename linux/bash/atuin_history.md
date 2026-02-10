<https://github.com/atuinsh/atuin>
<https://atuin.sh/>

Almacenar el histórico de la shell en una sqlite:

- comando
- directorio de trabajo
- fecha de ejecución
- duración
- exit code
- hostname y user
- shell session

Tiene un servicio cloud de sincronización, pero me parece que puede haber info muy sensible como para enviarlo a un tercero, auqnue técnicamente es cifrado end-to-end.

Se puede desplegar un server propioi, autin + postgres: <https://docs.atuin.sh/self-hosting/server-setup/>

Si estábamos usando el plugin de zsh `per-directory-history`, podemos importar el histórico con:
<https://blog.markhepburn.com/posts/atuin-and-per-directory-history-import/>
Ejecutar en ~/.local/share/atuin/, añadiendo la línea al final:

```python
main("/home/adrian/.directory_history")
```

Configuración en ~/.config/atuin/config.toml
SQLite en ~/.local/share/atuin/history.db

Para usarlo en zsh, meter en .zshrc:

```
# Bind ctrl-r but not up arrow
eval "$(atuin init zsh --disable-up-arrow)"
```

# Uso

`control + r` para buscar en el histórico.
Pulsando varias veces cambia entre búsqeudas:

- global
- por directorio
- por host
- por sesión
- workspace (current git repo)

Ejemplos de búsqueda:
<https://docs.atuin.sh/reference/search/#examples>

## Borrar histórico

Borrar todo el histórico de ~/Documentos/ desde ayer:

```bash
atuin search --cwd "/home/adrian/Documentos" --after "yesterday" --delete ""
```
