https://github.com/rupa/j2

Simplifica el movernos entre directorios.


git clone https://github.com/rupa/j2.git ~/.j_jump
echo << END
# https://github.com/rupa/j2
export JPY=~/.j_ump/j.py
. ~/.j_ump/j.sh
END >> .bashrc


## Uso

Tras movernos por los directorios, pulsar 'j' para ver una lista de directorios recientes.
j foo
  nos llevará al directorio de más peso (más visitado) que contenga 'foo'.

j foo bar
  nos llevará al directorio de más peso (más visitado) que contenga 'foo' y 'bar'
