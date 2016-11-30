https://docs.python.org/3/library/functions.html#bytes
https://wiki.python.org/moin/BitwiseOperators

b'hola'

>>> c = bytearray("252")
>>> c[0]
50
>>> c[1]
53
>>> c[2]
50

Bytearray de 16 veces 0
>>> bytearray(16)
bytearray(b'\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00')


# And
>>> bin(20)
'0b10100'
>>> 20 & 0xf
4
>>> bin(4)
'0b100'

   0001 0100 (20)
 & 0000 1111 (0xF)
=  0000 0100 (4)


# shift right
>>> bytearray("P")[0]
80
>>> bytearray("P")[0] >> 4
5

Esto ha dividido entre 16



# Bits
>>> a = bytearray("P")[0] >> 4
>>> a
5
>>> type(a)
<type 'int'>
>>> bin(a)
'0b101'



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
