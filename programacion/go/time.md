https://golang.org/pkg/time/

import "time"

# Sleep
time.Sleep(100 * time.Millisecond)

# Parsear fecha
const longForm = "Jan 2, 2006 at 3:04pm (MST)"
t, _ := time.Parse(longForm, "Feb 3, 2013 at 7:54pm (PST)")

En la variable escribimos un formato de ejemplo de fecha para que luego sepa como parsear
La fecha que tenemos que poner debe ser esta:
Mon Jan 2 15:04:05 MST 2006 (MST is GMT-0700)
escrita en el formato que queramos.

Por ejemplo:
const longForm = "2006-01-02 15:04:05"
updated, err := time.Parse(longForm, "2016-03-14 17:52:24")

Devuelve:
2016-03-14 17:52:24 +0000 UTC

# Now
time.Now()

# Diferencia de tiempos
t0 := time.Now()
time.Sleep(1*time.Second)
t1 := time.Now()
fmt.Printf("The call took %v to run.\n", t1.Sub(t0))
