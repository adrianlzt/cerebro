https://github.com/mattn/go-pubsub


To subscribe:

ps := pubsub.New()
ps.Sub(func(i int) {
    fmt.Println("int subscriber: ", i)
})



To publish:

ps.Pub(1)
