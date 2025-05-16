Para gestionar códigos TOTP.

Lo que se almacena es una clave que va generando distintos códigos.

Si exportamos la cuenta, el código bidi contiene un formato tipo:
otpauth-migration://offline?data=xxxxxxxxipzrve%2B%2F%2F%2F%2F%2F8B

Las xxxx son en base64 la clave y el nombre asignado a esa cuenta.

Para generar la clave en base32 usar <https://github.com/dim13/otpauth>
go install github.com/dim13/otpauth@latest
otpauth -link "otpauth-migration://offline?data=CiIKxxxxxxxxxxdTNxxxxxxxxxxSCFE3MTxxxxxxxxxxAxxxxxxxxxxAKNejxuYH"

En caso de que nos den el secret directamente, o lo obtengamos de la url tipo otpauth://totp/foobar?secret=aaaaaaaay&issuer=Test
Lo podremos usar directamente, en mayúsculas

Podemos obtener los códigos de esa cuenta con oathtool (ese valor es el mismo que almacenamos en gopass):
oathtool --totp -b LA_CLAVE_EN_BASE_32

online: <https://totp.danhersam.com/>

Podemos usar gopass, metiendo en el yaml
totp: clave_en_base32

Y luego para obtener la clave:
gopass totp foo/bar

Con gopass también podemos poner la URL que viene en el código bidi como segunda línea
gopass show golang.org/gopher
secret1234
otpauth://totp/golang.org:gopher?secret=ABC123
