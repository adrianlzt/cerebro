https://msdn.microsoft.com/en-us/library/ff561499.aspx
http://www.hep.wisc.edu/~pinghc/x86AssmTutorial.htm

registros: e.. son 32 bits
registros: x.. o r.. son 64 bits

32 bits:
EIP, contador de programa
ESP, puntero de stack o puntero de frame, apunta a la parte alta del stack frame
EBP base pointer, apunta a la base del stack frame
EAX, se usa en c para retonar el valor
EAX,EBX,ECX,EDX... "general purpose", more or less interchangeable
ESI, source index
EDI, destination index


64 bits:
RIP, contrador de programa
RSP, puntero de stack o puntero de frame, apunta a la parte alta del stack frame
RBP base pointer, apunta a la base del stack frame
RAX,RBX,RCX,RDX... "general purpose", more or less interchangeable
RAX, se usa en c para retonar el valor
R8,R9,R10...R15 "general purpose", more or less interchangeable
RSI, source index
RDI, destination index


Segmentos:
http://stackoverflow.com/questions/10810203/what-is-the-fs-gs-register-intended-for
http://reverseengineering.stackexchange.com/questions/2006/how-are-the-segment-registers-fs-gs-cs-ss-ds-es-used-in-linux

CS = Code Segment (used for IP)
DS = Data Segment (used for MOV)
ES = Destination Segment (used for MOVS, etc.)
SS = Stack Segment (used for SP)
FS = "File Segment"?
GS = ???
