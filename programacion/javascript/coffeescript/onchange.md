Cuando se eliga algo en un select, se llama a un ajax que nos devuelve un javascript que nos dirá que hacer.

$(document).on 'change', '.check_select', (event) ->
  $.ajax
    url: "<%= example_checks_path %>"
    data:
      check_id: $(this).val()
      input_id: $(this).next().next().attr("id")
    dataType: "script"

