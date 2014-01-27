# Ejecutar un script .r
# Rscript script.r parametro1 parametro2
# [1] "parametro1" "parametro2"
#
args <- commandArgs(trailingOnly = TRUE)
print(args)
