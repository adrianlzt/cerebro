https://golang.org/pkg/image/
https://golang.org/pkg/image/draw/
https://blog.golang.org/go-imagedraw-package

# Concatenar imagenes
http://stackoverflow.com/questions/35964656/golang-how-to-concatenate-append-images-to-one-another

# PNG
https://golang.org/pkg/image/png/

import "image/png"

// Leyendo una imagen de una respuesta http
img,err := png.Decode(resp.Body)

Para convertir a png generar image.NRGBA
