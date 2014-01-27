http://wiki.bash-hackers.org/syntax/arith_expr

0… (leading zero) is interpreted as an octal value
0x… is interpreted as a hex value
0X… also interpreted as a hex
<BASE>#… is interpreted as a number according to the specified base <BASE>, e.g., 2#00111011 (see below)


var=0800
echo "oct: $var"
echo "dec: $(( 10#$var ))"

> oct: 0800
> dec: 800
