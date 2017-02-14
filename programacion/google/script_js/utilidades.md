https://developers.google.com/apps-script/reference/utilities/

Utilities.sleep(3000);
// en milisegundos


# Date
https://developers.google.com/apps-script/reference/utilities/utilities#formatDate(Date,String,String)
var formattedDate = Utilities.formatDate(new Date(), "GMT", "yyyy-MM-dd'T'HH:mm:ss'Z'");
Logger.log(formattedDate);

unix timestamp (en milisegundos)
date.getTime()
