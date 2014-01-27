$(document).on 'click', '#delete_service', (event) ->
  event.preventDefault()
  $(this).prev("input[type=hidden]").val("1")
