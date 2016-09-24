# GoMail
https://godoc.org/gopkg.in/gomail.v2
https://github.com/go-gomail/gomail/

Este parece el más potente.

go get gopkg.in/gomail.v2

## Enviar email con postfix
	s := gomail.SendFunc(func(from string, to []string, msg io.WriterTo) error {
		buf := new(bytes.Buffer)
		msg.WriteTo(buf)
		cmd := utils.CommandBuilder("sendmail", "-F", from, "-f", strings.Join(to, ","), "-t")
		cmd.Stdin = buf
		_, err := cmd.CombinedOutput()
		return err
	})

## Adjuntar fichero forzando el content-type / Añadir cabeceras
  m.Attach(image_temp_file.Name(),
      gomail.SetHeader(map[string][]string { "Content-Type": []string{"imagen/jpeg"}}))

	m.Embed(image_temp_file.Name(),
		gomail.SetHeader(map[string][]string {
			"Content-Type": []string{"imagen/jpeg"},
			"Content-ID": []string{"<service-image>"},
			"Content-Disposition": []string{"inline; filename=\"service-image.png\""},
		}))



# JW-email
Otra opción:
https://github.com/jordan-wright/email
https://godoc.org/github.com/jordan-wright/email
