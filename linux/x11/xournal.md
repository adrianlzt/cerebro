Editor online que corre en el navegador (rellenar, añadir texto, imágenes, firmar, poner contraseña, combinar PDFs, borrar páginas):
<https://breezepdf.com/>

Para esconder datos poniendo cajas negras delante.
<https://pdfredactoronline.com/>

Reducir tamaño PDFs
<https://den-run-ai.github.io/pdfmini/>

Multitool para PDFs, mergear, convertir, dividir, rotar, comprimir, firmar, cifrar, etc.
<https://stirlingpdf.io/>
También tiene un editor: <https://stirlingpdf.io/view-pdf>

Añadir recuadros para rellenar a un PDF con cajas pero sin esa funcionalidad puesta:
<https://detect.penpusher.app/>

Discusión en hackernews con más herramientas: <https://news.ycombinator.com/item?id=43880962>

xournal
Para tomar notas e insertar imágenes sobre pdfs

masterpdfeditor
A complete solution for viewing, creating and editing PDF files

pdfcrop
pdfcrop --margins '-50 -50 -50 -50' input.pdf output.pdf
crops 50 pts from the left, top, right, bottom (in this order).

Ver metadatos
pdfinfo file.pdf

Editar metadatos
pdftk

Unir dos pdfs
pdftk file1.pdf file2.pdf cat output merged_file.pdf

# De imagen a pdf sin pérdidas

img2pdf imagen.png -o file.pdf
img2pdf 1.png 2.png 3.png -o file.pdf

# Reducir tamaño PDF de imagen

shrinkpdf in.pdf out.pdf
shrinkpdf in.pdf out.pdf 200
ir jugando con el valor (resolución in DPI) hasta encontrar el tamaño que queremos.

# Quitar watermark

<https://superuser.com/questions/448519/how-to-remove-watermark-from-pdf-using-pdftk>

1.- Descomprimir el pdf
pdftk original.pdf output uncompressed.pdf uncompress

2.- Quitar texto watermark
sed -i "s/WATERMARK//g" uncompressed.pdf

3.- Reparar pdf
pdftk uncompressed.pdf output fixed.pdf compress

# Ver firmas en un pdf

pdfsig fichero.pdf
