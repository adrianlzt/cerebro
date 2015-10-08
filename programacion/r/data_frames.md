http://www.r-tutor.com/r-introduction/data-frame

You can think of a data frame as something akin to a database table or an Excel spreadsheet. It has a specific number of columns, each of which is expected to contain values of a particular type. It also has an indeterminate number of rows - sets of related values for each column.

Para trabajar son sus datos podemos verla como una matriz que tiene unas cabeceras para las columnas, y que la primera columna tiene un formato especial (factors)

> nombres = c("pepe","juan","ramon")
> peso = c(78,90,40)
> edad = c(24,55,30)
> usuarios <- data.frame(nombres,peso,edad)
> print(usuarios)
  nombres peso edad
1    pepe   78   24
2    juan   90   55
3   ramon   40   30


> usuarios[2]
  peso
1   78
2   90
3   40
> usuarios[[2]]
[1] 78 90 40
> usuarios[["peso"]]
[1] 78 90 40

> usuarios$nombre
[1] pepe  juan  ramon
Levels: juan pepe ramon

Se pueden poner solo las primeras letras y el sabrá completar:
> usuarios$p
[1] 78 90 40
Nos dará NULL si no sabe como completar


# Tamaño
nrow(mtcars)    # number of data rows 
ncol(mtcars)    # number of columns 

# Info
head(mtcars)    # Muestra los primeros valores y los nombres de las columnas


# Importar
Se pueden importar ficheros CSV (primera fila con las descripciones de las columas)
read.csv("fichero.csv")


Para leer ficheros con otro separador:
x <- read.table("infantry.txt", sep="\t")
  Posteriormente podemos darle cabecera: colnames(x) = c("columna1","col2")
Si el fichero tiene una primera línea con la descripción de las columnas:
read.table("infantry.txt", sep="\t", header=TRUE)


Podemos unir data frames si comparten alguna columna de igual nombre:
> ciudad = c("madrid","alcala","zamora")
> localidad <- data.frame(nombres,ciudad)
> merge(x=usuarios,y=localidad)
  nombres peso edad peso.1 ciudad
  1    juan   90   55     90 alcala
  2    pepe   78   24     78 madrid
  3   ramon   40   30     40 zamora


