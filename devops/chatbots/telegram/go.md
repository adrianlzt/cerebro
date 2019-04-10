import "github.com/go-telegram-bot-api/telegram-bot-api"
bot, err := tgbotapi.NewBotAPI("TOKEN")
m := tgbotapi.NewMessage(chatUint64, "mensaje")
m.ParseMode = "markdown"
bot.Send(m)


Formato markdown aceptado: https://core.telegram.org/bots/api#markdown-style
Si queremos enviar un link tiene que tener una url con fqdn http://asd no vale

Enviar imagen
n := tgbotapi.NewPhotoUpload(chatUint64, "/data/Imagenes/Chamrousse.jpg")
n.Caption = texto
n.ParseMode = "markdown"
bot.Send(m)

Parece que no funciona el formato markdown en el caption, aunque según la doc si debería: https://core.telegram.org/bots/api#sendphoto
