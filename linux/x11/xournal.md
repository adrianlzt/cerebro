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
pdfjoin /tmp/salida.pdf /tmp/salida.pdf
genera salida-joined.pdf


# Quitar watermark
https://superuser.com/questions/448519/how-to-remove-watermark-from-pdf-using-pdftk

1.- Descomprimir el pdf
pdftk original.pdf output uncompressed.pdf uncompress

2.- Quitar texto watermark
sed -i "s/WATERMARK//g" uncompressed.pdf

3.- Reparar pdf
pdftk uncompressed.pdf output fixed.pdf compress


# Ver firmas en un pdf
pdfsig fichero.pdf
