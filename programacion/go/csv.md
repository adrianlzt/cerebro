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
