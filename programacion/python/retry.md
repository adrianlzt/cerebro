http://www.saltycrane.com/blog/2009/11/trying-out-retry-decorator-python/

from retry import retry
@retry(urllib2.URLError, tries=4, delay=3, backoff=2)
def urlopen_with_retry():
    return urllib2.urlopen("http://example.com")

This will retry the function if URLError is raised. Check the link above for documentation on the parameters, but basically it will retry a maximum of 4 times, with an exponential backoff delay doubling each time, e.g. 3 seconds, 6 seconds, 12 second



Otra opción:
https://pypi.python.org/pypi/retrying
