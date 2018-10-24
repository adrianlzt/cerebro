https://github.com/Tarrasch/zsh-autoenv

Podemos tener un entorno definido para cada directorio.

Cada vez que entramos a un directorio se pueden cargar unas variables y quitarlas al salir.

By default .autoenv.zsh is used for entering, and .autoenv_leave.zsh for leaving

La primera vez que vea un .autoenv.zsh nos mostrará el contenido y si queremos ejecutarlo (por seguridad de no ejecutar algo que nos hayamos bajado). Lo recordará para próximas veces.



# Install para oh-my-zsh
git clone https://github.com/Tarrasch/zsh-autoenv.git ~/.oh-my-zsh_custom/plugins/autoenv

Meter "autoenv" en la lista de plugins de .zshrc
