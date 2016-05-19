https://msdn.microsoft.com/en-us/library/ff561499.aspx
http://www.hep.wisc.edu/~pinghc/x86AssmTutorial.htm

registros: x.. son 64 bits
registros: e.. son 32 bits

Program Counter: %rip (64 bits, eip en 32 bits)
Registers: %rdi, %rsi, %rdx, %rcx
Return value: %rax (64 bits, %eax en 32 bits

EAX,EBX,ECX,EDX - "general purpose", more or less interchangeable

RSP puntero de pila para 64bits

Segmentos:
http://stackoverflow.com/questions/10810203/what-is-the-fs-gs-register-intended-for
http://reverseengineering.stackexchange.com/questions/2006/how-are-the-segment-registers-fs-gs-cs-ss-ds-es-used-in-linux

CS = Code Segment (used for IP)
DS = Data Segment (used for MOV)
ES = Destination Segment (used for MOVS, etc.)
SS = Stack Segment (used for SP)
FS = "File Segment"?
GS = ???
