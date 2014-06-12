kk () {
echo hola
}


# Usar variables locales dentro de las funciones
# Declarar i local si la vamos a usar para un for
change_owner_of_files() {
    local user=$1; shift
    local group=$1; shift
    local files=$@
    local i

    for i in $files
    do
        chown $user:$group $i
    done
}
