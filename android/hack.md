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



Intercepter-NG
http://www.elladodelmal.com/2016/05/intercepter-ng-auditar-la-red-wifi.html
Nos permite auditar una red wifi, redireccionar tráfico del usuario via nuestro terminal
Robar cookies, hacer sslstrip.


https://forums.kali.org/showthread.php?20079-Tuxcut-a-Linux-alternative-to-Netcut

https://www.zimperium.com/zanti-mobile-penetration-testing
App de pago para analisis de redes, MiTM, etc
Tambien tienen apps para ver si nuestro telefono está infectado.


Exploits de routers:
http://www.routerpwn.com/


dSploit
http://www.elladodelmal.com/2014/01/dsploit-pentesting-hacking-wifi-desde.html
App para android
Clientes conectados
Escaner de puertos y vulnerabilidades
Ataques conocidos a routers
Ataques MiTM (varios: http://www.elladodelmal.com/2014/01/dsploit-pentesting-hacking-wifi-desde_18.html)


androrat
https://github.com/DesignativeDave/androrat
https://github.com/wszf/androrat
http://www.hackplayers.com/2013/05/androrat-un-troyano-rat-para-android.html
Trojano opensource para android
Hace falta ponerle a fuego el servidor y luego compilarlo.


https://www.flexispy.com/es/
Trojano de pago para obtener todo tipo de información de un android/ios


Parece que es posible leer los mensajes de whatsapp a través de su base de datos
http://stackoverflow.com/questions/37777913/decrypt-whatsapp-crypt12
http://forum.xda-developers.com/showthread.php?t=2689911
http://whatcrypt.com/

Si tenemos el telefono rooteado es muy facil leer los mensajes.
Solo hace falta leer con sqlite3 el fichero:
/data/data/com.whatsapp/databases/msgstore.db
wa.db -> contactos
axolotl.db -> parece que esta la info de la encriptación punto a punto.
  select recipient_id,public_key from identities;
  ahi parece que se guarda la clave publica de los contactos para enviarles mensajes

http://www.weare4n6.com/decrypting-encrypted-whatsapp-databases-without-the-key/
