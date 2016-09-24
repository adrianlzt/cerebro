# Robfig cron
https://godoc.org/github.com/robfig/cron

go get github.com/robfig/cron

Usa el formato unix

c := cron.New()
c.AddFunc("0 30 * * * *", func() { fmt.Println("Every hour on the half hour") })
c.AddFunc("@hourly",      func() { fmt.Println("Every hour") })
c.AddFunc("@every 1h30m", func() { fmt.Println("Every hour thirty") })
c.Start()

Ejecutar una funcion cada 5 minutos
c.AddFunc("* */5 * * * *", func() {
  update_wos()
})


# gocron
https://github.com/jasonlvhit/gocron

gocron.Every(1).Second().Do(task)
gocron.Every(1).Day().At("10:30").Do(task)


