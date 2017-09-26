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



# uint32 to bytes array
https://stackoverflow.com/questions/29061764/golang-convert-uint32-or-any-built-in-type-to-byte-to-be-written-in-a-file

var bar uint64 = 1506412518
a := (*[4]byte)(unsafe.Pointer(&bar))[:]
fmt.Printf("a: %v\n", a)
>> a: [230 7 202 89]



# Array de bytes a uint32
https://stackoverflow.com/questions/11184336/how-to-convert-from-byte-to-int-in-go-programming

var mySlice = []byte{89, 202, 7, 230}
data := binary.BigEndian.Uint32(mySlice)
fmt.Println(data)
