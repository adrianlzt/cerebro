Marca de servidores

# Arranque
When trying to enter the bios by remote console on our X9 boards with UEFI bios, you have to press "ESC" + "-" keys at the same time. When you have a X8 board you can use "F4" to enter the bios.

F12 parece que nos lleva a arranque PXE

F2 puede que sea entrar en la bios



# Errores
02A2: BMC System Error Log (SEL) Full.
Lleno el log de messages de IPMI. Entrar en la bios -> Advanced -> IPMI -> Clear system event log -> Enable
