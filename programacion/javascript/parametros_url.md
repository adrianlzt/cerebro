https://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-get-parameters

var url_string = "http://www.example.com/t.html?a=1&b=3&c=m2-m3-m4-m5";
var url = new URL(url_string);
var c = url.searchParams.get("c");
console.log(c);
