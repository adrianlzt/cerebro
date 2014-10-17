s = Scheduler("acction",3,1)
print s # Esto llama a s.__repr__


class Scheduler(object):
    def __init__(self,action,interval,delay):
        self._action = action
        self._interval = interval
        self._delay = delay

    def __repr__(self):
        return '%s %s %s' % (self._action, self._interval, self._delay)

