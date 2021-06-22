https://www.integralist.co.uk/posts/profiling-go/

https://github.com/pkg/profile

Meter al comienzo del main()
defer profile.Start().Stop()

Nos genera un fichero pprof en /tmp

Abrirlo con:
go tool pprof -http=localhost:6061 http://localhost:6060/debug/pprof/heap
  para memoria, nos abre un server web donde podemos navegar por la info

go tool pprof -http=localhost:6061 /tmp/fichero.pprof
  abre el navegador para visualizar el contenido del fichero

go tool pprof -web /tmp/fichero.pprof
Nos genera un .svg en /tmp y lo abre con el navegador

go tool pprof -png /tmp/profile528756456/cpu.pprof
  si queremos generar un png


Para analizar la memoria:
go tool pprof http://localhost:6060/debug/pprof/heap
> top
 nos saca lo que más consume
> pdf
  genera un pdf con quien llama a cada función mostrando quien consume más


# Locks
https://www.instana.com/blog/detecting-lock-contention-in-go/

go tool pprof http://localhost:6060/debug/pprof/block
