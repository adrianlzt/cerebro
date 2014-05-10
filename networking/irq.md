cat /proc/interrupts            # localizo IRQ de un device
                                  podemos ver cuantas interrupciones se están analizando en cada cpu
/proc/irq/<IRQ>/smp_affinity    # asocio esa IRQ a una CPU concreta

Aqui es especialmente util hacer pinning de IRQ a una cpu concreta.
Cambiar la máscara para que una determina IRQ vaya a una determinada CPU.
