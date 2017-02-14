www.vaultier.org/

Almacen de contraseñas online. App para montarlo en tu propio servidor.
La encriptación/desencriptación se hace localmente. Se envían/reciben datos cifrados.


# Entorno de desarrollo
http://docs.rclick.cz/docs/vaultier/en/latest/contribute.html

Me ha tocado cambiar algunas cosas que que tire:
REQUIREMENTS
-uWSGI==2.0
+uWSGI

setup.py
-        'six==1.4.1',
+        'six==1.10.0',

cp vaultier/vaultier/settings/dev.py vaultier/vaultier/settings/base.py

./vaultier/manage.py setup  <-- Este comando no existe, ignorar

Configurar con la bbdd postgres. He usado un concat de las settings base.py mas dev.py

Arrancar como:
./vaultier/manage.py runserver





# Internals
curl 'http://localhost:8091/api/secrets/' -H 'Cookie: PLAY_SESSION=1f383ea85fb7012232c95bf010bde9a5815cf082-sessionid=95f1905ba43c1c925cc808906d9d40ebdc7ff2971eb8694100faa12396b22b724d5f81531c6b8a9188b8200ff4ae6fb2; login_region="http://172.16.0.11:5000/v2.0/"; csrftoken=SAdi2CX3KOONuljW1ODdnzFzuyVDsOtv; sessionid=z5ah10pp7qpj2ymkqdoptxclx3ygm8jb; org.cups.sid=6e55bffb86ad04787ff5d9d9f57e28fd; dev_appserver_login="test@example.com:True:185804764220139124118"; auth=Z3Vlc3Q6ejRuNGhvcjE0; m=34e2:|ca3:t; grafana_sess=356e9c4d6e7468c0; grafana_user=admin; grafana_remember=7319bc56f29ae1fd1e97b6f60a5657c9312e0565b754b4ea' -H 'Origin: http://localhost:8091' -H 'Accept-Encoding: gzip, deflate, br' -H 'X-Vaultier-Token: Vc!)vu\5aRh=]2plM/8<;s#Q42=r28^G4v%rp~{TxEOZ0Ep+([V)jJ}}4mCJE*g@' -H 'Accept-Language: es-ES,es;q=0.8,en;q=0.6' -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36' -H 'Content-Type: application/json; charset=UTF-8' -H 'Accept: application/json, text/javascript, */*; q=0.01' -H 'Referer: http://localhost:8091/' -H 'X-Requested-With: XMLHttpRequest' -H 'Connection: keep-alive' --data-binary '{"type":200,"data":"U2FsdGVkX1/gcZ0dLkkvEboEu5iE+vyOCP2dJVXiPC3FzyfJSqaHLKROsYne0rvQ","card":1,"name":"PRUEBA"}' --compressed

Cuando pedimos una tarjeta nos envia:
[{"id": 1, "type": 200, "name": "PRUEBA", "data": "U2FsdGVkX1/gcZ0dLkkvEboEu5iE+vyOCP2dJVXiPC3FzyfJSqaHLKROsYne0rvQ", "blob_meta": null, "card": 1, "perms": {"read": true, "create": true, "update": true, "invite": true, "delete": true}, "created_at": "2017-02-08T10:56:50.399Z", "updated_at": "2017-02-08T10:56:50.399Z", "created_by": {"id": 1, "nickname": "adrian", "email": "adrianlzt@gmail.com"}}]



var publicKey = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgfnc+UAsKDaL2LdD9Uac↵RbauipT1eD91wypKY19jCkp5KNjf5wBfzhNQj62ymjzfnTla67JZurNCBe1EgjJQhPXIVaV7omWp9uBy5m2QxJaRm6NqTs/4keGSaQh1qMYx8TWufrNJadyH9nVpLfivbD57sfsI7+H13/+xhuvFZQjinmUv52sArPP17k4a99kSN+jD557XDxCXGq6Gn80C45fGElOrv2vpNyOjN1B2mxaVZPzHR0ad/10qZcJKm6MWKubaCr2iwjj4/Wi2Ij9jiV3ohagdookWx9JEDs5baQDil2P9ebpl73DhHAwV8KyUiTTAd5Yg27U4LnchjtgJnQIDAQAB"

var privateKey = "MIIEogIBAAKCAQEAgfnc+UAsKDaL2LdD9UacRbauipT1eD91wypKY19jCkp5KNjf\n5wBfzhNQj62ymjzfnTla67JZurNCBe1EgjJQhPXIVaV7omWp9uBy5m2QxJaRm6Nq\nTs/4keGSaQh1qMYx8TWufrNJadyH9nVpLfivbD57sfsI7+H13/+xhuvFZQjinmUv\n52sArPP17k4a99kSN+jD557XDxCXGq6Gn80C45fGElOrv2vpNyOjN1B2mxaVZPzH\nR0ad/10qZcJKm6MWKubaCr2iwjj4/Wi2Ij9jiV3ohagdookWx9JEDs5baQDil2P9\nebpl73DhHAwV8KyUiTTAd5Yg27U4LnchjtgJnQIDAQABAoIBAGIde/Grv6mbg3XU\n4jgFVXJKtPdn+uULApqREhZxqxHZphxvmpWGcsvdSLMtK+XCjgrhgQDrYVDOgMh4\nk360/JNh9hixEuNEW0lBpXrMurur7b7PXTChTcLRxPQErsz40DqFi3OZY5HGJ9yk\nRQGu+L19bWKtXdG3gSPWoOx4jkn1lxCWTLYpT0fQ0iIobCxmfEdtb/ZYVWfLTuBj\nr+pKxS58qWSMW799G27qZCn2qm92xlY7rmBUdVVAO0jUowla+Ts9zE0WuTLcwOMZ\n2HJ0FAzWygG785vS8pZZX5yk1GicsFWPef7uhxAi/FGbT8II1XTcIxHZiclkNdzm\nv7yg4wECgYEAw10NNgtKC6xVpWDXfN223M9WlQWx+WT2HzHEBe21jZGWP3gUG06F\nAg1wCf1Xml+m6OT508V9KiiVVCaua6YOlN/7S2wZxiMpQbcSV/Bym1SjQN0lhE0L\nqnjNqGcyJHRhb0ejir2LBsO2We+fzlUPLHs6GEgDhfWyEKD+qX1WjpcCgYEAqlFW\nKyQLu8klTPoeHn24rwtLWxM6TPB5kIWh4/n8Dlvuhm5BN/SU9oAb0hVnXjABHQhy\nM/EMPPqaDIM3vgR+TYOZDhEL0aST60U0nGRnvUW6iWTrTl1nfaW5e5UKkvQJoRXL\n9Xm9anAQkdSJ6bucn1+F9XF+l2ftTPhK8xVPo+sCgYAd4xxkSjHXu1OW60vMFHcn\nLKkIP0jM6H8mooxkg8skj0M3Dn2097wtZjTfslw2h6+XLYByv2G4k2DU8N36JftR\nFzrwfOcsgrCLFyC9R1GhJb+b6rkUllzUhYqg2ri3Dv7g8Uq5rOmZ7VL2S0xdWnHp\n0ig/ErVHRyEonhiXgU8+nQKBgCdL5vbDNVXZfhq5ptNgLIlusK9Ny2jPHy1CN+0S\n0544hdtMew2/B9OsET8yowvvRYJ+XWMwnaNAKuTyLZ1RChc2Ys0FD9YKA/sHl7Dx\n1aGtAfILb+M/1838u8QQykTHu6UIE2wK77IsMxaClGNyXxvCfXT4/71NREo7C4f0\nhdCLAoGAVvUoD0EbsPt7VvZGp7fdMKbRSwPc6hQpPiVqo0uQC/WXNOC2O1Vic4jQ\nH9rr2ngCTwWNk0Hm15pqg4dt5L34qOxM8F2L+Rd1WSnl1tOV4PuP20k3n6sL9MdD\nQ3yn8Stp3rRS4IzfQHmrj/ckv0dnw0Px2PlOntVjkKJFGibqjgc="

var data = '{"password":"MIPASS"}'
var encrypted_data = "U2FsdGVkX1/gcZ0dLkkvEboEu5iE+vyOCP2dJVXiPC3FzyfJSqaHLKROsYne0rvQ"

var workspaceKey_encrypted = "IYezfxTERRpkV5TDQv75vVJpjUwtY9kmlD3NuwR7T9kvOF1mhkLpFT/LJ1KbsmuPgEHHW97es8BLLLAxr5cxEok0RLO5C7KTgGNGKN/qk4nY9S6xa+s4+rfVgY+Ro1WvtbrQYZ01OUr0QBBKZiZYu9GJhTpu7f9DuxD7+rjyRXpjkiKAF2d4Cu1Nab+E4k8k5yPh1j0nYphRH7oAbFykcXhaYTeTRp6xk5FRBT5aN0jJ1/k8vWjksO/uMES/KWgkeCxFv8O6RiNRzgqvvhiyeRDzJR8RJScsfZaeb4vkstLWjceZDSIgdNJFVBybE+9glzJdFAwDQGHFVrHVU0InMw=="



Todos los datos de un workspace están encriptados usando RSA con la clave workspaceKey.

La clave workspaceKey está encriptada con AES (encriptamiento clave pública, clave privada).
Las claves workSpace encriptadas son diferentes para cada usuario y se almacenan en la tabla vaultier_member.


# Desencriptacion
Para desencriptar los datos que nos envia el servidor:
Con nuestra clave privada desencriptamos la workspaceKey (RSA, usando JSEncrypt, ecriptamiento asimétrico)
Con esa clave RSA desencriptamos el mensaje (AES, usando CryptoJS.AES, encriptamento simétrico)

Ejemplo:
var decoder = new JSEncrypt()
decoder.setPublicKey(privateKey)
var workspaceKey = decoder.decrypt(workspaceKey_encrypted)
CryptoJS.AES.decrypt(encrypted_data, workspaceKey).toString(CryptoJS.enc.Utf8)


# Encriptacion
var decoder = new JSEncrypt()
decoder.setPublicKey(privateKey)
var workspaceKey = decoder.decrypt(workspaceKey_encrypted)
CryptoJS.AES.decrypt(encrypted_data, workspaceKey).toString(CryptoJS.enc.Utf8)








# Invitacion
Al invitar a un usuario se crea una nueva entrada en la tabla "vaultier_member" solo con el invitation hash.
Ese hash se puede usar para crear una nueva cuenta accediendo a:
URLVAULTIER#/invitations/use/133/HASH/

Tras el usuario crearse la cuenta, se guardará la clave publica en vaultier_user

Una vez logueado el usuario se le pedirá que acepte la invitación para ver las claves de un workspace, vault o card

Quedará a la espera de que entre algún usuario que tenga la clave del workspace para reencriptarla con la clave pública de este nuevo usuario.



# Login de un user

1.- Pide la hora al server
GET http://localhost:8091/api/server-time/
Respuesta: {"datetime": "2017-02-08T12:11:54.408Z"}
service/AuthPromises.js:21

2.- Hace POST para registrarse
POST a http://localhost:8091/api/auth/auth
email:adrianlzt@gmail.com
date:2017-02-08T12:11:54.408Z
signature:OqTRN03tIZQL4yL/UT3wKoAkN4DLc2Ea2j/G52TuxvvbKkE1NC+Xmzt/Q2ylsbI2ANcOpUvHaaVHJD0EHtWQ/LN9z0F6HrIQ0eHwPPxM+fvl/bnUBGG/qv99jYweA1i21mVNwHGG/nzFE2tBFGcdELLXpN/W/Pkq7mltI2NDltGun671S1ENzeJREk1jC41XvUcwyw2gnrPLXunAoz+1VuLCFDS1oE9gb1fHjxCi7aMIU7K0iTHW0ihbr8jop36y8AtoMIAD/O8E9QqaWVNQqiNO3vYiLa83k/aBvOaa5S0R8TLXuQ4kTMwWFopAeVBje63LgWw+BKljPhrue/NKew==

signature = hex2b64(rsa.signString(email + datetime, 'sha1') # usando nuestra clave privada

Verificacion en el server:
cls.verify(user.public_key, email, date, signature)
signature = b64decode(signature)
key = RSA.importKey(public_key)
h = SHA.new(content + str(date))
verifier = PKCS1_v1_5.new(key)
return verifier.verify(h, signature)


A partir de ahora se identifica usando la cabecera:
X-Vaultier-Token:mL;a@K?#gW_bS,#TFjZ.8$_eUA/187!a^_BV|GKaobO20ND~./JHLK_CADq[J^0a

3.- Obtiene su public key
GET http://localhost:8091/api/users/1/
Respuesta:
{"id": 1, "email": "adrianlzt@gmail.com", "nickname": "adrian", "public_key": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAgfnc+UAsKDaL2LdD9Uac\nRbauipT1eD91wypKY19jCkp5KNjf5wBfzhNQj62ymjzfnTla67JZurNCBe1EgjJQ\nhPXIVaV7omWp9uBy5m2QxJaRm6NqTs/4keGSaQh1qMYx8TWufrNJadyH9nVpLfiv\nbD57sfsI7+H13/+xhuvFZQjinmUv52sArPP17k4a99kSN+jD557XDxCXGq6Gn80C\n45fGElOrv2vpNyOjN1B2mxaVZPzHR0ad/10qZcJKm6MWKubaCr2iwjj4/Wi2Ij9j\niV3ohagdookWx9JEDs5baQDil2P9ebpl73DhHAwV8KyUiTTAd5Yg27U4LnchjtgJ\nnQIDAQAB\n-----END PUBLIC KEY-----"}


4.- Obtiene los workspaces disponibles (esta respuesta le devuelve siempre su workspace y, cuando hay usuarios nuevos, los nuevos workspaces para que los firme):
GET http://localhost:8091/api/workspace_keys/
[{"id": 2, "workspace": 1, "status": 200, "user": 2, "created_at": "2017-02-08T12:01:24.561Z", "updated_at": "2017-02-08T12:07:00.216Z"}, {"id": 1, "workspace": 1, "status": 300, "user": 1, "created_at": "2017-02-08T10:56:02.552Z", "updated_at": "2017-02-08T10:56:02.878Z"}]


5.- Coge sus workspaces (donde viene la clave del workspace encriptada)
GET http://localhost:8091/api/workspaces/
Respuesta:
[{"id": 1, "slug": "adrians-workspace", "name": "Adrian's workspace", "description": "Adrian's default workspace to store vaults, cards and secrets", "membership": {"status": 300, "id": 1, "workspace_key": "IYezfxTERRpkV5TDQv75vVJpjUwtY9kmlD3NuwR7T9kvOF1mhkLpFT/LJ1KbsmuPgEHHW97es8BLLLAxr5cxEok0RLO5C7KTgGNGKN/qk4nY9S6xa+s4+rfVgY+Ro1WvtbrQYZ01OUr0QBBKZiZYu9GJhTpu7f9DuxD7+rjyRXpjkiKAF2d4Cu1Nab+E4k8k5yPh1j0nYphRH7oAbFykcXhaYTeTRp6xk5FRBT5aN0jJ1/k8vWjksO/uMES/KWgkeCxFv8O6RiNRzgqvvhiyeRDzJR8RJScsfZaeb4vkstLWjceZDSIgdNJFVBybE+9glzJdFAwDQGHFVrHVU0InMw=="}, "perms": {"read": true, "create": true, "update": true, "invite": true, "delete": true}, "created_at": "2017-02-08T10:56:02.496Z", "updated_at": "2017-02-08T10:56:02.533Z", "created_by": {"id": 1, "nickname": "adrian", "email": "adrianlzt@gmail.com"}}]


6.- Pide un workspace en particular (obtiene lo mismo pero sin estar dentro de un array)
GET http://localhost:8091/api/workspaces/1/

7.- Vuelve a pedir lo mismo pero ahora con el slug (conversion del nombre del workspace a una string sin espacios en blanco ni caracteres raros)
GET http://localhost:8091/api/workspaces/adrians-workspace/

8.- Obtiene la clave publica del otro usuario
GET http://localhost:8091/api/workspace_keys/2/
Respuesta:
{"id": 2, "public_key": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA05CAJBkpxcIiABi+msPF\nPek7URzxaMOed+xBInHOyAqi0GWP7XjcMvoY5PQWS8eGNwEi9/55Om2V9KtD0mig\n0WQsa6OQENgh7mqJ5rZaKX0KkgTF63hoh0lidH3FFYEdhI5TuBxZkWRuy0eOjJ6d\n5N+y1GuyYPvfOxHZ1sgXjAAL+RcfoHk/pWNaY6NcwuWhTAvEIU0DqicKuEKgjQPq\nPST04M0dcJW1emjMwzJkGcz64O7ppI2YiwkkKPQRwGQeWuQemvDrbRc06MG38SN2\nN5WoszAHevKGPVs7KazEatNqiIGSnQnQDXgtSO4LM2ojoAB9d6s95jM+7Ppfhtj0\nGQIDAQAB\n-----END PUBLIC KEY-----", "workspace_key": "", "status": 200, "workspace": {"id": 1, "slug": "adrians-workspace", "name": "Adrian's workspace"}, "user": {"id": 2, "nickname": "worker", "email": "worklzt@gmail.com"}, "created_at": "2017-02-08T12:01:24.561Z", "updated_at": "2017-02-08T12:07:00.216Z"}

9.- Encripta la clave del workspace con la clave pública del otro usuario y lo envía a la bbdd
PUT http://localhost:8091/api/workspace_keys/2/
Payload:
{"public_key":"-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA05CAJBkpxcIiABi+msPF\nPek7URzxaMOed+xBInHOyAqi0GWP7XjcMvoY5PQWS8eGNwEi9/55Om2V9KtD0mig\n0WQsa6OQENgh7mqJ5rZaKX0KkgTF63hoh0lidH3FFYEdhI5TuBxZkWRuy0eOjJ6d\n5N+y1GuyYPvfOxHZ1sgXjAAL+RcfoHk/pWNaY6NcwuWhTAvEIU0DqicKuEKgjQPq\nPST04M0dcJW1emjMwzJkGcz64O7ppI2YiwkkKPQRwGQeWuQemvDrbRc06MG38SN2\nN5WoszAHevKGPVs7KazEatNqiIGSnQnQDXgtSO4LM2ojoAB9d6s95jM+7Ppfhtj0\nGQIDAQAB\n-----END PUBLIC KEY-----","workspace_key":"HkOdfGxot9JdNoTbC5TJLHPm35sX/vHACTSibt0Rkj6yL3VMWrRBU51rSUcEtus91pYr9y44/+34QaoObo136YsM+p9yfGZw7JnzVOrZn5zIAE90OQHtr0b7tSl67vzBuZ7mxx5HSRvdXq4xna5d59LqmF6xFSu80ONSrUyZ62eMLakcto12A/vb6HgWz1RBWJjzzMZnUM8oHYV67+tV4a25ebr7H6Gc0FCRPkTgrNKZ0BV3zR0JXLgwT4U4y213soTg/h/mi0xwRVDosGbcYO4O+RdkF8RrYS2VzXo2AHXy+Y7utF/W1Hcm4NgppFwu0yYdMzXHXK5VPT2jfpaDdA==","status":"200","workspace":{"id":1,"slug":"adrians-workspace","name":"Adrian's workspace"},"user":{"id":2,"nickname":"worker","email":"worklzt@gmail.com"},"id":2}

Respuesta: el workspace_ley/2 (no importante)


10.- Luego va recorriendo lo que tiene debajo de su workspace (los vaults y que roles tiene en ellos)
GET http://localhost:8091/api/vaults/?workspace=1
Respuesta:
[{"id": 1, "slug": "default-vault", "name": "Default vault", "color": "blue", "description": "Adrian's default vault to store cards and secrets", "workspace": 1, "perms": {"read": true, "create": true, "update": true, "invite": true, "delete": true}, "created_at": "2017-02-08T10:56:02.989Z", "updated_at": "2017-02-08T10:56:03.054Z", "created_by": {"id": 1, "nickname": "adrian", "email": "adrianlzt@gmail.com"}}]

GET http://localhost:8091/api/roles/?to_workspace=1
Respuesta:
[{"id": 1, "level": 200, "member": {"id": 1, "status": 300, "email": "adrianlzt@gmail.com", "nickname": "adrian", "workspace": 1, "user": 1, "created_at": "2017-02-08T10:56:02.552Z", "updated_at": "2017-02-08T10:56:02.878Z"}, "to_workspace": 1, "to_vault": null, "to_card": null, "created_by": {"id": 1, "nickname": "adrian", "email": "adrianlzt@gmail.com"}, "created_at": "2017-02-08T10:56:02.556Z", "updated_at": "2017-02-08T10:56:02.556Z"}]





# Mini cliente

## Parte RSA
Puede que la clave publica que genera no sea buena. La he tenido que regenerar con openssl:
openssl rsa -pubout -in rsa.pvt > rsa.pub

Con esa nueva publica y la privada original funciona esto:
echo "alguna cosa" | openssl rsautl -encrypt -inkey rsa.pub -pubin | base64 | base64 -d | openssl rsautl -decrypt -inkey rsa.pvt

## Parte AES
pip install Crypto

CryptoJS version antigua (https://github.com/sytelus/CryptoJS/)
Usa modo OBF sin padding, y concatena el iv generado random (16 bytes) al comienzo

CryptoJS versio nueva (https://github.com/brix/crypto-js)
http://stackoverflow.com/questions/27220297/what-are-the-aes-parameters-used-and-steps-performed-internally-by-crypto-js-whi

EvpKDF para la key y el IV a partir del passphrase
AES-256 mode CBC with PKCS5 (o PKCS7, es lo mismo)

El output lo da en base64 haciendo
"Salted__".concat(salt).concat(ciphertext)

Para sacar la clave en hex y devolverla a utf8:
k = CryptoJS.enc.Utf8.parse(passPhrase)
k.toString(CryptoJS.enc.Utf8)

Convertir hex a un Words:
salt = CryptoJS.format.Hex.parse("e0719d1d2e492f11").ciphertext



# Seguridad
La lib jsencrypt esta pensada para navegador y tiene bastantes bugs, puede que no sea muy segura.

