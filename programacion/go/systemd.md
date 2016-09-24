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

