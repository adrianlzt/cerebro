import time

timeout = 5
start = time.time()
while time.time() - start < timeout:
    print("corriendo")
    time.sleep(1)

print("fin")



# Con signal, para limitar la duración de una función
# Usamos "timeout" como un decorador
class TimeoutError(Exception): pass

def timeout(seconds, error_message = 'Function call timed out'):
    def decorated(func):
        def _handle_timeout(signum, frame):
            raise TimeoutError(error_message)

        def wrapper(*args, **kwargs):
            signal.signal(signal.SIGALRM, _handle_timeout)
            signal.alarm(seconds)
            try:
                result = func(*args, **kwargs)
            finally:
                signal.alarm(0)
            return result

        return functools.wraps(func)(wrapper)

    return decorated
