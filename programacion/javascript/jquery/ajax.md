http://api.jquery.com/jQuery.ajax/

var url = "action/195581";

$.ajax({
  type: 'put',
  url: url
})
.done(function( msg ) {
  alert( "Data Saved: " + msg );
});

