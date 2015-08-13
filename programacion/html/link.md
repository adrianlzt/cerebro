<a hre="http://google.com">Texto</a>

En nueva ventana/pestaña:
<a href="http://www.w3schools.com/" target="_blank">Visit W3Schools!</a>


Links con javascript inline
<a href="javascript: xmlhttp=new XMLHttpRequest(); xmlhttp.open('GET', 'https://google.es', true); xmlhttp.send();">Item5</a>

Con auth:
req.open(method, fullurl, true);
req.setRequestHeader("Authorization", "Basic " + Base64.encode(user + ":" + pass)); 
req.send(data);
