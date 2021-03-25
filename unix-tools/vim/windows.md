A buffer is the in-memory text of a file.
A window is a viewport on a buffer.
A tab page is a collection of windows.


Dividir verticalmente:
C-w v
:vsplit

Horizontalmente
C-w S

Control+w w
  anterior
Control+w h,j,k,l
  para navegar entre ellas

Control+w q
  cerrar splits


,q  cerrar buffer sin cerrar ventana




CTRL+w, v: Opens a new vertical split

CTRL+w, c: Closes a window but keeps the buffer

CTRL+w, o: Closes other windows, keeps the active window only

CTRL+w, right arrow: Moves the cursor to the window on the right

CTRL+w, r: Moves the current window to the right

CTRL+w, =: Makes all splits equal size


Cerrar ventanas
:q[uit]
:{count}q[uit]
...
                If [count] is greater than the last window number the last
                window will be closed:
                    :1quit  " quit the first window
                    :$quit  " quit the last window
                    :9quit  " quit the last window
                            " if there are less than 9 windows opened
                    :-quit  " quit the previews window
                    :+quit  " quit the next window
                    :+2quit " quit the second next window
