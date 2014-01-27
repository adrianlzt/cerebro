http://docs.julialang.org/en/latest/manual/packages/

Instalar:
Pkg.add("IJulia")

Instalar de un repo no oficial:
Pkg.clone("git://example.com/path/to/Package.jl.git")

Actualizar base de paquetes:
Pkg.update()

Lista de instalados:
Pkg.installed()

Borrar:
Pkg.rm("paquete")


Información (metadata) sobre los paquetes:
https://github.com/JuliaLang/METADATA.jl


Dependencias entre paquetes:
If you put constraints on the julia pseudo-package in a package's REQUIRE file, only compatible versions of packages will be considered:
  in 0.2-only REQUIRE: julia 0.2- 0.2+
  in 0.2-incompatible REQUIRE: julia 0.3
