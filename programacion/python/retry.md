http://www.saltycrane.com/blog/2009/11/trying-out-retry-decorator-python/

from retry import retry
@retry(urllib2.URLError, tries=4, delay=3, backoff=2)
def urlopen_with_retry():
    return urllib2.urlopen("http://example.com")

This will retry the function if URLError is raised. Check the link above for documentation on the parameters, but basically it will retry a maximum of 4 times, with an exponential backoff delay doubling each time, e.g. 3 seconds, 6 seconds, 12 second



Otra opción:
https://pypi.python.org/pypi/retrying
pip install retrying

from retrying import retry

class HTTP_500(Exception):
    pass

def retry_if(ex):
    """Retry if the exception is HTTP_500"""
    # Aqui tambien podemos hacer lo que queramos, como rehacer un login
    return isinstance(ex, HTTP_500)

@retry(retry_on_exception=retry_if, wait_fixed=1000, stop_max_attempt_number=3)
def test():
    """If this func raises a HTTP_500 exception, try to execute it again 3 times, waiting one second"""
    print("test", flush=True)
    raise HTTP_500("Error")

test()

