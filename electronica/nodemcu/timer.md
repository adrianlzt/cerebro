http://nodemcu.readthedocs.org/en/dev/en/modules/tmr/

We're using the timer functions tmr.alarm() and tmr.stop(), it's the recommended way to run code at designated intervals since it's non-blocking.

local function wifi_wait_ip() 
  ...
  tmr.stop(1)
  ...
end
tmr.alarm(1, 2500, 1, wifi_wait_ip)
