Cambiar las extensiones por .ini
for file in *; do mv $file ${file%.*}.ini; done
