# Convertir una string a un elemento que cumpla la interfaz io.Reader
buf := bytes.NewBufferString("cadena")



# Cuando tenemos algo que quiere escribir a un io.Writer y nosotros queremos una string
buf := new(bytes.Buffer)
msg.WriteTo(buf)
fmt.Println(buf.String())


Otra opción:
var buf bytes.Buffer
msg.WriteTo(&buf)
buf.String()
