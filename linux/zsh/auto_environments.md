https://github.com/direnv/direnv
Mejor que el zsh-autoenv. Me permite ejecutar scripts enteros sin problemas (el otro me fallaba con un script que tenia que hacerle un source).

Meter en los directorios un:
.envrc


direnv allow
  para permitir el .envrc que nunca hemos visto antes (o se ha modificado)

direnv edit



https://github.com/Tarrasch/zsh-autoenv

Podemos tener un entorno definido para cada directorio.

Cada vez que entramos a un directorio se pueden cargar unas variables y quitarlas al salir.

By default .autoenv.zsh is used for entering, and .autoenv_leave.zsh for leaving

La primera vez que vea un .autoenv.zsh nos mostrará el contenido y si queremos ejecutarlo (por seguridad de no ejecutar algo que nos hayamos bajado). Lo recordará para próximas veces.



# Install para oh-my-zsh
git clone https://github.com/Tarrasch/zsh-autoenv.git ~/.oh-my-zsh_custom/plugins/autoenv

Meter "autoenv" en la lista de plugins de .zshrc
