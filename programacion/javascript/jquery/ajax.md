http://api.jquery.com/jQuery.ajax/

$.ajax({
  type: 'POST',
  data: {clave: "valor"},
  url: "https://httpbin.org/post"
})
.done(function( msg ) {
  alert( "Data Saved: " + msg );
  console.log("msg: %o", msg);
})
.fail(function( msg ) {
  alert( "Error " + msg );
});


# JSON
$.ajax({
  type: 'POST',
  dataType: 'json',
  contentType: 'application/json; charset=UTF-8',
  url: url,
  data: JSON.stringify(data)
})
...

# Gestionar fallos
var jqxhr = $.ajax( "example.php" )
  .done(function() {
    alert( "success" );
  })
  .fail(function() {
    alert( "error" );
  })
  .always(function() {
    alert( "complete" );
  });

