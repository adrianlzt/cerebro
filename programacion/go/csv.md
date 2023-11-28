Mirar ejemplo /usr/lib/go/src/encoding/csv/example_test.go

import "encoding/csv"
import "strings"
csv.NewReader(strings.NewReader("hola,\" un campo\",123")).Read()

Leer un fichero, puede tener cambios de línea dentro de los fields (si estos están delimitados por '"').

f, err := os.Open("prueba.csv")
r := csv.NewReader(f)
for {
    record, err := r.Read()
    if err == io.EOF {
        break
    }
    if err != nil {
        log.Fatal(err)
    }

    fmt.Println(record)
}


Si queremos que los campos con string vacías tenga comillas (cosa que no hace encoding/csv) usar github.com/tushar2708/altcsv
https://stackoverflow.com/a/53664201

Sustituirla con:
import csv "github.com/tushar2708/altcsv"
