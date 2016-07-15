https://github.com/jung-kurt/gofpdf
https://github.com/signintech/gopdf

Ejemplo con todas las opciones que tenemos:
https://github.com/jung-kurt/gofpdf/blob/master/fpdf_test.go

Parece bastante complejo.

# Hello world
import "github.com/jung-kurt/gofpdf"

func main() {
  pdf := gofpdf.New("P", "mm", "A4", "")
  pdf.AddPage()
  pdf.SetFont("Arial", "B", 16)
  pdf.Cell(40, 10, "Hello, world")
  err := pdf.OutputFileAndClose("hello.pdf")
  if err != nil {
    panic(err)
  }
}

