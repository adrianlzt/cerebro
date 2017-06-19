https://unix.stackexchange.com/questions/5788/how-is-an-interrupt-handled-in-linux
https://0xax.gitbooks.io/linux-insides/content/interrupts/

irqbalance      # demonio que distribuye interrupciones en CPUs
/proc/irq/<IRQ>/smp_affinity    # afinidad de CPU para IRQ


Dos tipos de interrupciones:
  - síncronas (exceptions): producidas por la CPU mientras ejecuta instrucciones
  - asíncronas (interrupts): generadas por otro hardware


## Exceptions
Ejemplos: divide error, page fault, overflow
Deben ser gestionadas por el kernel.
Envía una señal al programa e intenta recuperarse del error.

Dos tipos:
  - processor-detected exception: generadas por la cpu mientras detectaba una condición anómala.
    tres subgrupos:
      > faults, pueden ser corregidas
      > traps, reportan una ejecucción
      > aborts, errores serios
  - programmed exception: requeridas por el programador, gestionadas como un trap


## Interrupts
Generadas por dispositivos IO (disk, adaptadores de red, teclado, etc), interval timers y (en sistemas multiprocesadores) otras CPUs.

Cuando se genera una interrupción la CPU debe para su ejecucción, almacenar su estado y atender la interrupción.

Una interrupción puede interrupmir a otra interrupción.
Hay zonas del kernel no interrumpibles.

Dos niveles de interrupciones:
  - maskable interrupts: generadas por dispositivos IO, pueden tener dos estados, masked o unmasked.
    Solo las interrupciones unmasked serán procesadas. Es una forma de evitar que salten más interrupciones mientras procesamos una.
  - nonmaskable interrupts (FIQ en linux): funciones criticas que siempre deben ser procesadas. Ej.: fallo de hardware


## Handling
Cada dispositivo hardware tiene su propia línea (IRQ, interrup request line)
Estos IRQ se numeran empezando en 0.
Cada línea se conecta con un PIC (programmable interrupt controller), que escucha en un IRQ y pasa la interrupción a una CPU.
En Linux "irqbalance" distribuye las interrupciones en las distintas CPUs

El kernel usa la IDT (interrupt descriptor table) para asociar cada interrupción o excepción a un handler.

Pasos al tratar interrupciones:
 - The CPU checks after each instruction if there's a IRQ from the (A)PIC
 - If so, consults the IDT to map the received vector to a function
 - Checks if the interrupt was issued by a authorized source
 - Saves the registers of the interrupted process
 - Call the according function to handle the interrupt
 - Load the recently saved registers of the interrupted process and try to resume it



# Linux - gestión de interrupciones
http://linuxburps.blogspot.fr/2013/10/linux-interrupt-handling.html
Análisis en detalle de como gestionar el kernel de linux para arm las excepciones
Mirándo directamente el código .asm y .c del kernel.

