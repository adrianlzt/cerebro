http://docs.ansible.com/pause_module.html

- pause:
Task para parar la ejecucción hasta que pulsemos enter

- pause: prompt="Make sure org.foo.FooOverload exception is not present"

- pause: minutes=5
- pause: seconds=5

- pause: prompt="Quieres continuar? (Control+c para salir)"

