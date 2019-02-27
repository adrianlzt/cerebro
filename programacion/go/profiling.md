https://github.com/pkg/profile

Meter al comienzo del main()
defer profile.Start().Stop()

Nos genera un fichero pprof en /tmp

Abrirlo con:
go tool pprof -web /tmp/fichero.pprof
Nos genera un .svg en /tmp y lo abre con el navegador


go tool pprof -png /tmp/profile528756456/cpu.pprof
  si queremos generar un png
