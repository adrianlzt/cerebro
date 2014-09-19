http://nose.readthedocs.org/en/latest/

unit test framework, used most notably by TurboGears and Pylons; provides an alternate test discovery and running process for unittest, one that is intended to mimic the behavior of py.test as much as is reasonably possible without resorting to too much magic. More friendly with unittest.TestCase-based tests than py.test. There are also many plugins (http://nose-plugins.jottit.com/) available.

pip install nose


## Testing tools ##
The nose.tools module provides a number of testing aids that you may find useful, including decorators for restricting test execution time and testing for exceptions, and all of the same assertX methods found in unittest.TestCase (only spelled in PEP 8 fashion, so assert_equal rather than assertEqual).


nose.tools.raises(*exceptions)
Test must raise one of expected exceptions to pass.

Example use:

@raises(TypeError, ValueError)
def test_raises_type_error():
    raise TypeError("This test passes")

@raises(Exception)
def test_that_fails_by_passing():
    pass


nose.tools.timed(limit)
Test must finish within specified time limit to pass.

Example use:

@timed(.1)
def test_that_fails():
    time.sleep(.2)

