http://ruby-doc.org/core-2.0.0/File.html

print File.read("/fichero.txt")

O respecto al directorio que estemos:
print File.read("file1")

FileUtils.cp("/file1","/tmp/file2")

Abrir fichero en modo append y agregar una cadena
irb(main):005:0> File.open("BORRAR","a") do |f|
irb(main):006:1* f << "esto lo meto desde rb"
irb(main):007:1> end

Fecha de modificación:
File.mtime("/Home/comics.txt")


if File.exist?(file)
  ...
end

Para sacar un array de ficheros en un path con wildcard (*) mirar dir.md
