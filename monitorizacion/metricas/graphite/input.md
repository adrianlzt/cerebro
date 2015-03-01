echo "categoria.nombre valor horaUTC" > /dev/tcp/172.17.0.5/2003
echo "adri.test 7 $(date +%s)" > /dev/tcp/172.17.0.5/2003

He visto que con una instancia docker tengo que mandar un control+c porque el nc no cierra.

Pueden ponerse subcategorias: categoria.subcategoria1.subcategoria2.nombre
