# Pasar parametros a un dialog
https://docs.botframework.com/en-us/node/builder/chat/UniversalBot/#starting-conversations

session.beginDialog '/chat', "texto libre"
...
@bot.dialog '/chat', [
  (session, texto) ->


# Dialgo retornado un valor
https://docs.botframework.com/en-us/node/builder/chat-reference/classes/_botbuilder_d_.session.html#enddialogwithresult

Si queremos retornar un dialog con lo resultados, usar:
endDialogWithResult


@intents.matches /chat$/i, [
  (session) =>
    console.log "comienza dialog chat"
    session.beginDialog '/chat'
    return
  (session, results) =>
    console.log "results: " + JSON.stringify(results)
    session.send "Dialog results #{results.response}"
    return
]


@bot.dialog '/chat', [
  (session) ->
    builder.Prompts.text session, "Tell me someting"
    return
  (session, results) ->
    session.endDialogWithResult({resp: results.response})
    return
]

