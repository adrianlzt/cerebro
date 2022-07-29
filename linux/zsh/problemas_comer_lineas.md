Con el dropdown term, si el prompt es lo suficientemente largo, come líneas.
Ahora mismo no consigo reproducirlo con otras term que no sean la dropdown, todas alacritty.

Con tmux split vertical y un prompt largo, quitando y poniendo zoom no le afecta.
Pero jugando con el tamaño de la ventana (ampliándola y reduciéndola horizontalmente), si termina afectando.

Parece que la clave es cuando por una reducción de tamaño necesita modificar un cambio de línea en el prompt.

export PS1=`python -c "print('a'*60+'$ ')"`


Arreglado haciendo el la term de tdrop sea siempre floating en i3wm.
Tenía mal el "for_window", no pilla la clase. Con title funciona bien.

Ahora las ventanas no varían su tamaño cuando abro/cierro dropdown.
