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

time.Now().Unix()
En formato epoch


t, _ := time.Parse("Jan 2, 2006 at 3:04pm (MST)", "Feb 3, 2013 at 7:54pm (PST)")

En la variable escribimos un formato de ejemplo de fecha para que luego sepa como parsear
La fecha que tenemos que poner debe ser esta:
Mon Jan 2 15:04:05 MST 2006 (MST is GMT-0700)
escrita en el formato que queramos.

Por ejemplo:
const longForm = "2006-01-02 15:04:05"
updated, err := time.Parse(longForm, "2016-03-14 17:52:24")

Devuelve:
2016-03-14 17:52:24 +0000 UTC

Con milisegundos (formato zabbix)
time.Parse("20060102:150405.000", ...)


Otra opcion: %Y-%m-%d %H:%M:%S.%f
t.Format("2006-01-02 15:04:05.000000000")

# Now
time.Now()


# Generar fecha
func Date(year int, month Month, day, hour, min, sec, nsec int, loc *Location) Time

Hoy a las 00:00
t := time.Now()
time.Date(t.Year(), t.Month(), t.Day(), 0, 0, 0, 0, t.Location())


# Agregar/quitar una duracion
https://play.golang.org/p/gVXMfuzztC

fmt.Println("Unix format:", time.Now().Format(time.UnixDate))
fmt.Println("Unix format:", time.Now().Add(-time.Duration(3)*time.Hour).Format(time.UnixDate))
  hora actual menos 3h

Cuidado al restar/sumar horas con los cruces de CET/CEST
Para calcular el primer día de la semana lo mejor es iterar (https://stackoverflow.com/a/18632496/1407722):
for date.Weekday() != time.Monday { // iterate back to Monday
  date = date.AddDate(0, 0, -1)
  isoYear, isoWeek = date.ISOWeek()
}


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



# Comparar si es no inicializado
someTime.IsZero()

# Comparar si es igual a otra fecha
someTime.Equal(time.Time{})

# Comparar si es antes o despues
func (t Time) Before(u Time) bool
func (t Time) After(u Time) bool

true si t0 + 20' está en el futuro
t0.Add(20*time.Minute).Before(time.Now())






# Human parse
https://github.com/olebedev/when
https://github.com/bcampbell/fuzzytime
https://github.com/araddon/dateparse



# Ticker
  ticker := time.NewTicker(time.Second)
  defer ticker.Stop()
  done := make(chan bool)
  go func() {
    time.Sleep(10 * time.Second)
    done <- true
  }()
  for {
    select {
    case <-done:
      fmt.Println("Done!")
      return
    case t := <-ticker.C:
      fmt.Println("Current time: ", t)
    }
  }
}
