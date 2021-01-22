Para ver los ultimos reseteos:
last reboot

Reinicar forzadamente:
http://es.wikipedia.org/wiki/REInicia_SUBnormal

Mantenemos pulsado Alt+ImprPt y vamos pulsando las teclas

Alt + PetSis + R E I S U B
Ctrl + AltGr + PetSis + R E I S U B


Reinicia/apaga el sistema sin pasar por init
reboot -f
poweroff -f


# SysRq
https://en.wikipedia.org/wiki/Magic_SysRq_key
https://fedoraproject.org/wiki/QA/Sysrq

La "magic key" SysRq tiene más funcionalidades.

Podemos forzar que salte el OOM: 'd'


Para consultar que comandos están activados para lanzar con la combinación de teclas:
cat /proc/sys/kernel/sysrq | xxd -r -p | xxd -b


También podemos ejecutar comandos con:
echo h > /proc/sysrq-trigger
  nos sacará en el dmesg la ayuda ('h') de sysrq

Otros que me parecen interesantes:
f - Will call oom_kill to kill a memory hog process.
m - Will dump current memory info to your console.
