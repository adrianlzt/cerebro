https://docs.micropython.org/en/latest/esp32/quickref.html#timers

from machine import Timer

tim0 = Timer(0)
tim0.init(period=5000, mode=Timer.ONE_SHOT, callback=lambda t:print(0))

tim1 = Timer(1)
tim1.init(period=2000, mode=Timer.PERIODIC, callback=lambda t:print(1))

Para pararlo:
tim1.deinit()
