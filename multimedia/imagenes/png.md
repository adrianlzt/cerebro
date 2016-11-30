Creado para reemplazar y mejorar a GIF.
Mapa de bits.
Bueno para imágenes con pocos colores (captura pantalla).
Comprime sin pérdidas.


Mirar https://github.com/drj11/pypng/blob/master/code/png.py para ver una implementación pure-python con la librería zlib

# Esquema binario
http://www.libpng.org/pub/png/spec/1.2/PNG-Structure.html
http://www.libpng.org/pub/png/book/chapter08.html

Cabecera + chunks
Chunks: IHDR IDAT IEND



IDAT contains all of the image's compressed pixel data. Although single IDATs are perfectly valid as long as they contain no more than 2 gigabytes of compressed data, in most images the compressed data is split into several IDAT chunks for greater robustness
Small IDAT chunks are by far the most common, particularly in sizes of 8 or 32 kilobytes.

IEND is the simplest chunk of all; it contains no data, just indicates that there are no more chunks in the image

PLTE, palette-based images require

Tipos de datos:
http://www.libpng.org/pub/png/book/chapter11.html
Physical Pixel Dimensions (pHYs)



## Cabecera
The first eight bytes of a PNG file always contain the following (decimal) values:
   137 80 78 71 13 10 26 10
This signature indicates that the remainder of the file contains a single PNG image, consisting of a series of chunks beginning with an IHDR chunk and ending with an IEND chunk.

Obtener esta cabecera de un fichero:
od -A none -t u1 -N 8 imagen.png

Significado de la firma:
Decimal Value 	ASCII Interpretation
137  0x89				A byte with its most significant bit set (``8-bit character'')
80 	 0x50				P
78 	 0x4E				N
71 	 0x47				G
13 	 0x0D				Carriage-return (CR) character, a.k.a. CTRL-M or ^M
10 	 0x0A				Line-feed (LF) character, a.k.a. CTRL-J or ^J
26 	 0x1A				CTRL-Z or ^Z
10 	 0x0A				Line-feed (LF) character, a.k.a. CTRL-J or ^J

## Chunks
length | type(name) | data | CRC

4-byte length (in ``big-endian'' format, as with all integer values in PNG streams)

4-byte chunk type (nombre ASCII)

between 0 and 2,147,483,647 bytes of chunk data

4-byte cyclic redundancy check value (CRC, cyclic redundancy check)
http://www.libpng.org/pub/png/spec/1.2/PNG-Structure.html#CRC-algorithm
http://www.libpng.org/pub/png/spec/1.2/PNG-CRCAppendix.html

### IHDR
00 00 00 0D  49 48 44 52  00 00 00 01 00 00 00 01 08 00 00 00 00  3A 7E 9B 55
---size----  chunk type   ---Width--- ---Height-- BD CT CM FM IM  ----CRC----
 13 bytes       IHDR

IHDR (image header) must be the first chunk in a PNG image, and it includes all of the details about the type of the image: its height and width, pixel depth, compression and filtering methods, interlacing method, whether it has an alpha (transparency) channel, and whether it's a truecolor, grayscale, or colormapped (palette) image
   Width:              4 bytes
   Height:             4 bytes
   Bit depth:          1 byte
   Color type:         1 byte
   Compression method: 1 byte
   Filter method:      1 byte
   Interlace method:   1 byte

   Color    Allowed    Interpretation
   Type    Bit Depths
   0       1,2,4,8,16  Each pixel is a grayscale sample.
   2       8,16        Each pixel is an R,G,B triple.
   3       1,2,4,8     Each pixel is a palette index; a PLTE chunk must appear.
   4       8,16        Each pixel is a grayscale sample, followed by an alpha sample.
   6       8,16        Each pixel is an R,G,B triple, followed by an alpha sample.

### Chunks extras/options
00 00 00 09  70 48 59 73  00 00 00 27 00 00 00 27 01 2A 09 91 4F
---size----  chunk type   --px/unit-- --px/unit-- US ----CRC----
                          ------resolution-------
               pHYs           39          39

00 00 00 07  74 49 4D 45  07 E0 0A 0F 12 29 14 89 7D 85 5D
---size----  chunk type   --------------------  ----CRC----
               tIME

00 00 00 1D  69 54 58 74  43 6F 6D 6D 65 6E 74 00 00 00 00 00 43 72 65 61 74 65 64 20 77 69 74 68 20 47 49 4D 50 64 2E 65 07
---size----  chunk type                                                                                          ----CRC----
 29 bytes     iTXt


## IDAT
http://www.libpng.org/pub/png/spec/1.2/PNG-Chunks.html#C.IDAT
http://www.libpng.org/pub/png/spec/1.2/PNG-DataRep.html#DR.Image-layout

00 00 00 0D 49 44 41 54  08 1D 01 02 00 FD FF 00 64 00 66 00 65  A4 50 C6 1B
---size----  chunk type  CM AF ---------data------- check value  ----CRC----
               IDAT

Aquí es donde va la información de la imagen.
Primero se escanea línea a línea, siendo cada pixel del tipo: indexed-color, grayscale o truecolor.
	Grayscale: 0 negro, valor máximo 255.
A cada línea se le pasa un filtro (definido en IHDR, Filter Method) (se añade el tipo de filtrado al comienzo de cada línea).
Luego se pasa está información al compresor.

La información comprimida está en el formato zlib
   Compression method/flags code: 1 byte
   Additional flags/check bits:   1 byte
   Compressed data blocks:        n bytes
   Check value:                   4 bytes

CM=08 ("deflate" compression)


### IEND, final del fichero
00 00 00 00 49 45 4E 44 AE 42 60 82
---size----  chunk type ----CRC----
                IEND
