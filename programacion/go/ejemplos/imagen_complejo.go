// http://tour.golang.org/#60

package main

import (
    "pic"
    "image"
    "image/color"
)

type MiImagen struct{
    ancho int
    alto int
}

func (i MiImagen) ColorModel() color.Model {
    return color.RGBAModel
}

func (i MiImagen) Bounds() image.Rectangle {
    return image.Rect(0, 0, i.ancho, i.alto)
}

func (i MiImagen) At(x, y int) color.Color {
    return color.RGBA{uint8(x)*10, uint8(y)*7, uint8(x+y)*5, uint8(x+y)}
}

func main() {
    m := MiImagen{100,100}
    pic.ShowImage(m)
}
