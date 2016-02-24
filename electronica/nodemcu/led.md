https://odd-one-out.serek.eu/esp8266-nodemcu-getting-started-hello-world/

pin = 4
gpio.mode(pin, gpio.OUTPUT)
gpio.write(pin, gpio.LOW)
gpio.write(pin, gpio.HIGH)





local led_state = gpio.HIGH

local function toggleLED()
    print("toggle")
    if led_state == gpio.LOW then
        led_state = gpio.HIGH
    else
        led_state = gpio.LOW
    end

    gpio.write(config.PIN_TERMOSTATO_ON, led_state)
end

-- parpadea el num de veces que le digamos durante freq tiempo
local function led_blink(num,freq)
  tmr.alarm(0, freq/2, tmr.ALARM_AUTO, toggleLED)
  tmr.alarm(1, freq*num, tmr.ALARM_SINGLE, function() tmr.stop(0) end)
end
