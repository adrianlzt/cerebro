https://check.torproject.org/

Nos dice si estamos navegando mediante tor

However, it does not appear to be the Tor Browser Bundle.
Nos dice que usemos un navegador seguro proporcionado por ellos.


https://check.torproject.org/api/ip
Devuelve un json tipo:
{"IsTor":true,"IP":"212.21.66.6"}

o, si no estamos:
{"IsTor":false,"IP":"15.25.2.3"}


curl https://check.torproject.org/?TorButton=1
<body>
  <a id="TorCheckResult" target="failure" href="/"></a>
</body>

o si estamos:
<body>                                                                                                                                                  <a id="TorCheckResult" target="success" href="/"></a>                                                                                               </body> 

