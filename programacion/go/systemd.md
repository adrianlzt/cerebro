https://github.com/coreos/go-systemd
Go bindings to systemd socket activation, journal, D-Bus, and unit files


# Leer journal
https://dev.snip2code.com/Snippet/942525/sdjournal-example

go get -u github.com/coreos/go-systemd/sdjournal


package main
import (
  "os"
  "time"
  "github.com/coreos/go-systemd/sdjournal"
)
func main() {
  jconf := sdjournal.JournalReaderConfig{
    Since: time.Duration(-15) * time.Minute,
    Matches: []sdjournal.Match{
      { 
        Field: sdjournal.SD_JOURNAL_FIELD_SYSTEMD_UNIT,
        Value: "cronie.service", // ${APPNAME}.service
      },
    },
  }

  jr, err := sdjournal.NewJournalReader(jconf)
  if err != nil {
    panic(err)
  }

  jr.Follow(nil, os.Stdout)
}




Jugar con ponernos una posición determinada con cursor y leer una entrada.
Hay que tener en cuenta que no podremos leer una entry ni pedir un cursor antes de hacer Next() u otra función que lea datos.
La idea es, nos colocamos en una posición (pero aun no hemos leido nada, si pedimos la entrada o el cursor fallará).
Pedimos la entrada, con Next() por ejemplo.
Ahora tendremos esa entrada en .Entry() y el cursor en .GetCursor()

Si colocamos el cursor (con SeekCursor) en el ultimo cursor disponible y hacemos Next(), en GetCursor tendremos el cursor usado para SeekCursor y en GetEntry la última entrada.
Si volvemos a hacer Next(), nos devolverá un 0, avisandonos de que no hay más entradas disponibles.


jor,_ := sdjournal.NewJournal()
jor.SeekCursor("s=d3d31664f98e415a823ecd3ba5d94751;i=2335a;b=c53e12954f424ce39f9cb07493574f96;m=18eaae600c;t=55a1780923578;x=6ae9739eea338d15")
n,_ := jor.Next()
c,_ := jor.GetCursor()
fmt.Printf("cursor: %v\n", c)
e,_ := jor.GetEntry()
fmt.Printf("entry: %v\n", e)


Podemos usar NextSkip(n) para saltar varias entradas.

En caso de que no haya más entradas, Next o NextSkip, nos dejarán en la última disponible.

Ejemplo en journald_example.go
