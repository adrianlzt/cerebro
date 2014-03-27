var fJS;
jQuery(document).ready(function($) {
  fJS = filterInit();
});

function filterInit() {

  var template = Mustache.compile($.trim($("#template").html()));

  var view = function(service){
    return template(service);
  };

  var settings = {
    search: {input: '#search_box' },
    and_filter_on: true,
    id_field: 'id' //Default is id. This is only for usecase
  };

  return FilterJS(services, "#service_list", view, settings);
}
