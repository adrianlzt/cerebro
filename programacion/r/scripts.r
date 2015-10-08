# Ejecutar un script .r
# Rscript script.r parametro1 parametro2
# [1] "parametro1" "parametro2"
#
# Si generamos gráficas se añadiran a un fichero Rplots.pdf
#
args <- commandArgs(trailingOnly = TRUE)
print(args)
