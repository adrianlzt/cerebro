Terminal X11 que permite dividir la pantalla en cuadrados y retransmitir lo que escribimos a todas las pantallas.

Ctrl+Shift+O
Split terminals Horizontally.

Ctrl+Shift+E
Split terminals Vertically.

Ctrl+Shift+Right
Move parent dragbar Right.

Ctrl+Shift+Left
Move parent dragbar Left.

Ctrl+Shift+Up
Move parent dragbar Up.

Ctrl+Shift+Down
Move parent dragbar Down.

Ctrl+Shift+S
Hide/Show Scrollbar.

Ctrl+Shift+F
Search within terminal scrollback

Ctrl+Shift+N or Ctrl+Tab
Move to next terminal within the same tab, use Ctrl+PageDown to move to the next tab. If cycle_term_tab is False, cycle within the same tab will be disabled

Ctrl+Shift+P or Ctrl+Shift+Tab
Move to previous terminal within the same tab, use Ctrl+PageUp to move to the previous tab. If cycle_term_tab is False, cycle within the same tab will be disabled

Alt+Up
Move to the terminal above the current one.

Alt+Down
Move to the terminal below the current one.

Alt+Left
Move to the terminal left of the current one.

Alt+Right
Move to the terminal right of the current one.

Ctrl+Shift+C
Copy selected text to clipboard

Ctrl+Shift+V
Paste clipboard text

Ctrl+Shift+W
Close the current terminal.

Ctrl+Shift+Q
Quits Terminator

Ctrl+Shift+X
Toggle between showing all terminals and only showing the current one (maximise).

Ctrl+Shift+Z
Toggle between showing all terminals and only showing a scaled version of the current one (zoom).

Ctrl+Shift+T
Open new tab

Ctrl+PageDown
Move to next Tab

Ctrl+PageUp
Move to previous Tab

Ctrl+Shift+PageDown
Swap tab position with next Tab

Ctrl+Shift+PageUp
Swap tab position with previous Tab

Ctrl+Plus (+)
Increase font size. Note: this may require you to press shift, depending on your keyboard

Ctrl+Minus (-)
Decrease font size. Note: this may require you to press shift, depending on your keyboard

Ctrl+Zero (0)
Restore font size to original setting.

F11
Toggle fullscreen

Ctrl+Shift+R
Reset terminal state

Ctrl+Shift+G
Reset terminal state and clear window

Super+g
Group all terminals so that any input sent to one of them, goes to all of them.

Super+Shift+G
Remove grouping from all terminals.

Super+t
Group all terminals in the current tab so input sent to one of them, goes to all terminals in the current tab.

Super+Shift+T
Remove grouping from all terminals in the current tab.

Ctrl+Shift+I
Open a new window (note: unlike in previous releases, this window is part of the same Terminator process)

Super+i
Spawn a new Terminator process


Layouts:

Podemos guardar un layout (divisiones que hemos creado, y tabs) para usarlo posteriormente.
Abrimos terminator, hacemos las divisiones y tabs que queramos, luego pinchamos con el botón derecho, preferencias, layouts, y damos a añadir.
Tambie podemos asignar un comando a cada terminal (ssh nodotal, por ejemplo).
Para arrancar con ese layout: terminator -l nombre

En el fichero terminator.config tengo un par de ejemplos
El fichero debe estar en ~/.config/terminator/config
