http://www.talyarkoni.org/blog/2014/10/29/yet-another-python-state-machine-and-why-you-might-care/comment-page-1/

Patrón de programación.

Gestión de estados y sus transiciones.
Soluciona los problema cuando tenemos muchos estados posibles y el paso de unos a otros está controlado por cierta lógica.




https://github.com/mriehl/fysom
En esta libreria se pueden definir callbacks que serán llamados cuando se ejecute una transición o se llegue a un estado.

fsm = Fysom({'events': [
                {'name': 'startup', 'src': 'none',  'dst': 'green'},
                {'name': 'panic', 'src': 'green', 'dst': 'red'},
                {'name': 'calm', 'src': 'red', 'dst': 'green'}]})
print fsm.current # "none"
fsm.startup()
print fsm.current # "green"





https://github.com/tyarkoni/transitions
En esta libreria la idea es que es un objeto al que se le aplican los triggers.
Estos triggers modifican el objeto


class Matter(object):
    def __init__(self): self.set_environment()
    def set_environment(self, temp=0, pressure=101.325):
        self.temp = temp
        self.pressure = pressure
    def print_temperature(self): print("Current temperature is %d degrees celsius." % self.temp)
    def print_pressure(self): print("Current pressure is %.2f kPa." % self.pressure)

lump = Matter()
machine = Machine(lump, ['solid', 'liquid'], initial='solid')
machine.add_transition('melt', 'solid', 'liquid', before='set_environment')

lump.melt(45)  # positional arg
lump.print_temperature()
> 'Current temperature is 45 degrees celsius.'

machine.set_state('solid')  # reset state so we can melt again
lump.melt(pressure=300.23)  # keyword args also work
lump.print_pressure()
> 'Current pressure is 300.23 kPa.'
