# All of the normal infix operators are available.
1 + 1 #=> 2
8 - 1 #=> 7
10 * 2 #=> 20
35 / 5 #=> 7.0
5 / 2 #=> 2.5 # dividing an Int by an Int always results in a Float
div(5, 2) #=> 2 # for a truncated result, use div. Nos devuelve el entero, no redondea
5 \ 35 #=> 7.0 # divide 35 entre 7
2 ^ 2 #=> 4 # power, not bitwise xor
12 % 10 #=> 2

# Enforce precedence with parentheses
(1 + 3) * 2 #=> 8

# Bitwise Operators
~2 #=> -3   # bitwise not (NOT x = −x − 1)
3 & 5 #=> 1 # bitwise and
2 | 4 #=> 6 # bitwise or
2 $ 4 #=> 6 # bitwise xor
2 >>> 1 #=> 1 # logical shift right
2 >> 1  #=> 1 # arithmetic shift right
2 << 1  #=> 4 # logical/arithmetic shift left

# You can use the bits function to see the binary representation of a number.
bits(12345)
#=> "0000000000000000000000000000000000000000000000000011000000111001"
bits(12345.0)
#=> "0100000011001000000111001000000000000000000000000000000000000000"

# Boolean values are primitives
true
false

# Boolean operators
!true #=> false
!false #=> true
1 == 1 #=> true
2 == 1 #=> false
1 != 1 #=> false
2 != 1 #=> true
1 < 10 #=> true
1 > 10 #=> false
2 <= 2 #=> true
2 >= 2 #=> true
# Comparisons can be chained
1 < 2 < 3 #=> true
2 < 3 < 2 #=> false

# Operador ternario
# Si code='-' -> code=0, si no, se queda como esta
code = (code == '-') ? 0 : code
