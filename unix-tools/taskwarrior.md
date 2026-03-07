<https://taskwarrior.org/>

Gestor de tareas para la linea de comandos.

Config en ~/.taskrc

Datos almacenados en ~/.task

sqlite en ~/.task/taskchampion.sqlite3

Creado backup con systemd timer.

# Hooks

Podemos ejecutar scripts cuando hagamos cosas a las tareas. Por ejemplo, sincronizar con google tasks, jira o lo que sea.

# Context

Filtros permanentes.

Para dividir tareas. Aplica a la visualización y a la creación de tareas (si el contexto está activo):

Creo un contexto "work" y le asocio las tareas con tag "work".

```bash
task context define work +work
```

# taskwarrior-tui

<https://kdheepak.com/taskwarrior-tui/>

interfaz simple ncurses

keybindings: <https://kdheepak.com/taskwarrior-tui/keybindings/>

Scroll de la pestaña help con j/k (no hay forma de desplazarse más rápido <https://github.com/kdheepak/taskwarrior-tui/issues/523>)

a: añadir task. Para añadir tags poner +XXX fuera de las comillas

A: añadir anotaciones a task

l: log task, crea una tarea y la marca inmediatamente como completada

/: filtrar.

e: editar task

m: modifiar nombre task

s: start/stop

d: marcar tarea como completada

x: borrar tarea

u: undo

z: toggle la ventana de abajo (task info)

v: para seleccionar varias tareas

## Filtros

Podemos usar status:deleted o status:completed para ver otros estados

Se abre el autocompletado con "tab" y se acepta con enter

# Bugwarrior

<https://bugwarrior.readthedocs.io/>

sincronizar tareas de sitios remotos (github, gitlab, jira, ...)
