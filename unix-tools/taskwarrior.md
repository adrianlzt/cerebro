<https://taskwarrior.org/>

Gestor de tareas para la linea de comandos.

Config en ~/.taskrc

Datos almacenados en ~/.task

sqlite en ~/.task/taskchampion.sqlite3

Creado backup con systemd timer.

# Status

P for a pending task (the default)

C for completed

D for deleted

R for recurring

# Hooks

Podemos ejecutar scripts cuando hagamos cosas a las tareas. Por ejemplo, sincronizar con google tasks, jira o lo que sea.

# Context

Filtros permanentes.

Para dividir tareas. Aplica a la visualización y a la creación de tareas (si el contexto está activo):

Creo un contexto "work" y le asocio las tareas con tag "work".

```bash
task context define work +work
```

# timewarrior

Para ver cuanto tiempo hemos dedicado a cada tarea, tag, etc


Lo instalamos y metemos el hook para que timewarrior se entere cuando hacemos start-stop de las tareas y pueda contar el tiempo.
```bash
pacman -S timew
cp /usr/share/doc/timew/ext/on-modify.timewarrior ~/.task/hooks
chmod a+x ~/.task/hooks/on-modify.timewarrior
```

Verificar con:
```bash
task diagnostics
```


```
❯ timew help
Create new config in /home/adrian/.config/timewarrior?
Create new database in /home/adrian/.local/share/timewarrior? (yes/no) yes

Usage: timew [--version]
       timew annotate @<id> [@<id> ...] <annotation>
       timew cancel
       timew config [<name> [<value> | '']]
       timew continue [@<id>] [<date>|<interval>]
       timew day [<interval>] [<tag> ...]
       timew delete @<id> [@<id> ...]
       timew diagnostics
       timew export [<interval>] [<tag> ...]
       timew extensions
       timew gaps [<interval>] [<tag> ...]
       timew get <DOM> [<DOM> ...]
       timew help [<command> | dates | dom | durations | hints | ranges]
       timew join @<id> @<id>
       timew lengthen @<id> [@<id> ...] <duration>
       timew modify (start|end) @<id> <date>
       timew modify range @<id> <interval>
       timew month [<interval>] [<tag> ...]
       timew move @<id> <date>
       timew [report] <report> [<interval>] [<tag> ...]
       timew retag @<id> [@<id> ...] <tag> [<tag> ...]
       timew shorten @<id> [@<id> ...] <duration>
       timew show
       timew split @<id> [@<id> ...]
       timew start [<date>] [<tag> ...]
       timew stop [<tag> ...]
       timew summary [<interval>] [<tag> ...]
       timew tag @<id> [@<id> ...] <tag> [<tag> ...]
       timew tags [<interval>] [<tag> ...]
       timew track <interval> [<tag> ...]
       timew undo
       timew untag @<id> [@<id> ...] <tag> [<tag> ...]
       timew week [<interval>] [<tag> ...]

Additional help:
       timew help <command>
       timew help dates
       timew help dom
       timew help durations
       timew help hints
       timew help ranges

Interval:
       [from] <date>
       [from] <date> to/- <date>
       [from] <date> for <duration>
       <duration> before/after <date>
       <duration> ago
       [for] <duration>

Tag:
       Word
       'Single Quoted Words'
       "Double Quoted Words"
       Escaped\ Spaces

Configuration overrides:
       rc.<name>=<value>
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

Control+E hacer down scroll en la ventana inferior

Control+Y hacer up scroll en la ventana inferior

## Filtros

Podemos usar status:deleted o status:completed para ver otros estados

Se abre el autocompletado con "tab" y se acepta con enter

# Bugwarrior

<https://bugwarrior.readthedocs.io/>

sincronizar tareas de sitios remotos (github, gitlab, jira, ...)
