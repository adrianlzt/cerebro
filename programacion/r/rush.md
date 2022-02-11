http://jeroenjanssens.github.io/rush/
https://datascienceatthecommandline.com/2e/chapter-9-modeling-data.html#more-wine-please

install.packages("remotes")
remotes::install_github("jeroenjanssens/rush")

Se instala en un path tipo:
~/R/x86_64-pc-linux-gnu-library/4.1/rush/exec/rush


Pintar dos columnas en un fichero csv
rush plot --x mpg --y hp mtcars.csv | display

Si quiero generar ese fichero .csv de ejemplo:
rush run 'head(mtcars, 10)' | tee mtcars.csv


Podemos añadir:
--geom smooth
  para generar una línea suave que "una" los puntos
--color type
  me falla, no se para que es


Si falla poner -v para ver el error
