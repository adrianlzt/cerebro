Analisis dinámico de apps de android

http://www.securitybydefault.com/2015/07/analisis-dinamico-de-apps-android-por.html?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+SecurityByDefault+%28Security+By+Default%29



Xposed is a framework for modules that can change the behavior of the system and apps without touching any APKs
http://repo.xposed.info/module/de.robv.android.xposed.installer


Unpinning de certificados con xposed
https://github.com/ac-pm/SSLUnpinning_Xposed


packet capture (nos permite ver el trafico de las apps. Hace un MitM para ver el trafico ssl)


Burp proxy
Se puede utilizar para capturar los paquetes de un android.
mirar burp_suite.md

Tras configurar el burp proxy, para la app de ing y borrarle cache y data, cuando intento entrar falla porque dice que la conex no es segura.

Parece que el truco está en iniciar la app "legalmente".
Una vez en la web de login ya se puede meter el proxy.


