# Convertir una string a un elemento que cumpla la interfaz io.Reader
buf := bytes.NewBufferString("cadena")

Cumple la interfaz io.ReadWriter (https://godoc.org/io#ReadWriter)


# Convertir un Reader en una string
ReadAll(r io.Reader) ([]byte, error)


# Cuando tenemos algo que quiere escribir a un io.Writer y nosotros queremos una string o []bytes
buf := new(bytes.Buffer)
msg.WriteTo(buf)
fmt.Println(buf.String())


Otra opción:
var buf bytes.Buffer
msg.WriteTo(&buf)
buf.String()

buf.Bytes()



# Copiar datos entre Writer y reader
io.Copy(rdr, wrt)
