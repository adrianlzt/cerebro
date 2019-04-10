import "github.com/go-telegram-bot-api/telegram-bot-api"
bot, err := tgbotapi.NewBotAPI("TOKEN")
m := tgbotapi.NewMessage(chatUint64, "mensaje")
bot.Send(m)
