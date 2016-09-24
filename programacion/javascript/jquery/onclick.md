$(document).on 'click', '#delete_service', (event) ->
  event.preventDefault()
  $(this).prev("input[type=hidden]").val("1")


http://stackoverflow.com/questions/1369035/how-do-i-prevent-a-parents-onclick-event-from-firing-when-a-child-anchor-is-cli
Si tenemos varios <div> anidados, cuando pulsamos sobre un hijo, el evento onclick se ejecutará sobre ese hijo y todos sus padres.
Para evitar esto:
$(document).on 'click', '.bola', (event) ->
  $(this).children().toggle()
  event.stopPropagation()
