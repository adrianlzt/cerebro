http://unix.stackexchange.com/questions/14270/get-exit-status-of-process-thats-piped-to-another

false | true; echo "${PIPESTATUS[0]}"

Si queremos ejecutar varios comandos y retornar el RC del primero:
cmd1 | cmd2 | cmd3; sh -c "exit \"${PIPESTATUS[0]}\""

{PIPESTATUS[@]}
imprime todos los valores

PIPESTATUS existe en bash.
En zsh es pipestatus.


# false | true; echo $?
0
# set -o pipefail
# false | true; echo $?
1


