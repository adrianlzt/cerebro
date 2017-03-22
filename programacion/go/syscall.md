https://golang.org/pkg/syscall
https://docs.google.com/document/d/1QXzI9I1pOfZPujQzxhyRy6EeHYTQitKKjHfpq0zpxZs/edit

https://godoc.org/golang.org/x/sys/unix


# Statfs
	var data syscall.Statfs_t
	err := syscall.Statfs("/", &data)
	if err != nil {
		panic(err)
	}

	avail_gbytes := float64(data.Bavail) * float64(data.Bsize) / math.Pow(1024, 3)

	fmt.Printf("Espacio libre en /: %.2fGB\n", avail_gbytes)

Para mapear el tipo de fichero, imprimir en hexadecimal (%x data.Type) y mirar aqui http://man7.org/linux/man-pages/man2/statfs.2.html

Los tamaños Bfree, Bavail y Blocks hay que multiplicarlos por Bsize para obtener los bytes



# Acct
Activar el accounting del kernel.

err := syscall.Acct("/var/tmp/acct")
if err != nil {
  panic(err)
}


Desactivarlo (no me deja llamar a syscall.Acct con vacio):
const SYS_ACCT = 163
_, _, e1 := syscall.Syscall(SYS_ACCT, 0, 0, 0)
if e1 != 0 {
  fmt.Println("Error al final")
  panic(e1)
}

