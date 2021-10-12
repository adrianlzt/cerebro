Para gestionar códigos TOTP.

Lo que se almacena es una clave que va generando distintos códigos.

Si exportamos la cuenta, el código bidi contiene un formato tipo:
otpauth-migration://offline?data=xxxxxxxxipzrve%2B%2F%2F%2F%2F%2F8B

Las xxxx son en base64 la clave y el nombre asignado a esa cuenta.

Para generar la clave en base32:
echo -n "otpauth-migration://offline?data=CiIKxxxxxxxxxxdTNxxxxxxxxxxSCFE3MTxxxxxxxxxxAxxxxxxxxxxAKNejxuYH" | sed "s/.*data=//" | base64 -di | cut -c 1-17 | tail -1 | base32

En caso de que nos den el secret directamente, o lo obtengamos de la url tipo otpauth://totp/foobar?secret=aaaaaaaay&issuer=Test
Lo podremos usar directamente, en mayúsculas

Podemos obtener los códigos de esa cuenta con oathtool:
oathtool --totp -b LA_CLAVE_EN_BASE_32

Podemos usar gopass, metiendo en el yaml
totp: clave_en_base32

Y luego para obtener la clave:
gopass totp foo/bar

Con gopass también podemos poner la URL que viene en el código bidi como segunda línea
gopass show golang.org/gopher
secret1234
otpauth://totp/golang.org:gopher?secret=ABC123
