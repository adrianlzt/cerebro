https://randomnerdtutorials.com/micropython-interrupts-esp32-esp8266/

pir = Pin(14, Pin.IN)
pir.irq(trigger=Pin.IRQ_RISING, handler=handle_interrupt)
