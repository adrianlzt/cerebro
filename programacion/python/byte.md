https://docs.python.org/3/library/functions.html#bytes

b'hola'


Imprimir el caracter ascii de una representacion hexadicemal:
>>> print(b'\x41')
A

Hexadicimal a la representacion decimal
>>> struct.unpack('B', '\x41')[0]
65

struct.unpack('B', b'\x41')[0]
py3

Para varios valores:
>>> map(lambda x: struct.unpack('B', x)[0], b'\x41\x42')
[65, 66]

list(map(lambda x: x, clave))
py3


Representaciones decimales a string de bytes:
>>> "".join(map(chr, [91, 175, 250, 131, 65, 60]))
'[\xaf\xfa\x83A<'


Bytes a bytearray y a byte
>>> l = bytearray('\x41\x42\xa5')
>>> l
bytearray(b'AB\xa5')
>>> bytes(l)
'AB\xa5'




Representacion decimal de cada caracter:
>>> map(ord,'hello')
[104, 101, 108, 108, 111]

>>> c = bytearray("252")
>>> c[0]
50
>>> c[1]
53
>>> c[2]
50

Tambien:
>>> ord('a')
97
>>> chr(98)
'b'


Bytearray de 16 veces 0
>>> bytearray(16)
bytearray(b'\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00')


# BitwiseOperators
https://wiki.python.org/moin/BitwiseOperators

## And
>>> bin(20)
'0b10100'
>>> 20 & 0xf
4
>>> bin(4)
'0b100'

   0001 0100 (20)
 & 0000 1111 (0xF)
=  0000 0100 (4)

## Or
6|1 = 7

## Xor
7^1 = 6

## shift left
bin(1 << 4)
0b10000

## shift right
>>> bytearray("P")[0]
80
>>> bytearray("P")[0] >> 4
5

Esto ha dividido entre 16

>>> a = 5
>>> type(a)
<type 'int'>
>>> bin(a)
'0b101'

## Complemento de x
~x

>>> bin(~0b1001)
'-0b1010'


## not
def bit_not(n, numbits=8):
    return (1 << numbits) - 1 - n


# Hex
>>> bin(20)
'0b10100'

>>> hex(20)
'0x14'

0001 0100
1    4


## Python2
>>> "asdas".encode("hex")
'6173646173'
>>> '6173646173'.decode("hex")
'asdas'

>>> binascii.a2b_hex("d49d99699b59b739")
'\xd4\x9d\x99i\x9bY\xb79'


binascii.a2b_*   ascii -> binario
binascii.b2a_*   binario -> ascii

## Python3
>>> import binascii
>>> binascii.hexlify(b'asdas')
b'6173646173'

>>> coso="cadena"
>>> binascii.hexlify(coso.encode('ascii'))
b'636164656e61'


Hexadecimal a bytes
bytes.fromhex("0405AABB")


String hex a int
int("8A", 16)


Int a hexadecimal formato XX
'{:06x}'.format(5)


byte string to string (py3)
str(bytes_string,'utf-8')

string a bytes (py3)
bytes("some text", "UTF-8")
b'some text'




# Struct
https://docs.python.org/2/library/struct.html
Interpretar ficheros binarios que almacenan structs de C

Tenemos que ir pasando valores y diciendole que tipo es.

Ejemplo, interpretamos los dos primeros bytes como unsigned short big endian, y los 4 siguientes como unsigned int big endian (nos devuelve una tupla donde el primer elemento es lo que queremos):
file = open("object.ring",'rb')
version = file.read(2)
struct.unpack('!H', version)
len = file.read(4)
struct.unpack('!I', len)
