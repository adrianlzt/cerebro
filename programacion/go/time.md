https://golang.org/pkg/time/

import "time"

# Sleep
time.Sleep(100 * time.Millisecond)
time.Sleep(time.Duration(tiempo) * time.Millisecond) // siendo tiempo un int

# Parsear duration
hours, _ := time.ParseDuration("10h")

# Parsear fecha
Unix epoch
tm := time.Unix(epochSecs, epochNanoSecs)


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

Otra opcion: %Y-%m-%d %H:%M:%S.%f
t.Format("2006-01-02 15:04:05.000000000")

# Now
time.Now()

# Agregar/quitar una duracion
https://play.golang.org/p/gVXMfuzztC

fmt.Println("Unix format:", time.Now().Format(time.UnixDate))
fmt.Println("Unix format:", time.Now().Add(-time.Duration(3)*time.Hour).Format(time.UnixDate))

# Diferencia de tiempos
t0 := time.Now()
time.Sleep(1*time.Second)
t1 := time.Now()
fmt.Printf("The call took %v to run.\n", t1.Sub(t0))

diff := t1.Sub(t0)
Tenemos disponibles:
diff.Hours()
diff.Minutes()
diff.Seconds()
diff.Nanoseconds()

# zona horaria
Imprime la fecha en otra zona horaria

now := time.Now()
l,_ := time.LoadLocation("CET")
fmt.Println(now)
fmt.Println(now.In(l))
