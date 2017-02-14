https://home-assistant.io/getting-started/scripts/#delay

# Waits 1 minute, 30 seconds
delay: 00:01:30

# Waits 1 hour
delay: 01:00

# Waits however many minutes input_slider.minute_delay is set to
# Valid formats include HH:MM and HH:MM:SS
delay: '00:{{ states.input_slider.minute_delay.state | int }}:00'

- delay:
    # supports seconds, milliseconds, minutes, hours
    minutes: 1
