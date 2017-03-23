mySlice := []byte("str")


buffer := []byte{111,115,100,32,102,115,95,99,111}
fmt.Printf("buffer: %s\n", buffer)
cadena := fmt.Sprintf("%s", buffer)


# Leer ficheros binarios
https://github.com/lunixbochs/struc

O usando la lib original:
https://golang.org/pkg/encoding/binary/

Leemos los 4 primeros bytes de "ringFile" como BinEndian y los almacenamos en "foo"
foo := make([]byte, 4)
binary.Read(ringFile, binary.BigEndian, &foo)

Luego podemos convertir este array en una string, int o lo que sepamos que es el valor.
