https://stackoverflow.com/questions/3898572/what-is-the-standard-python-docstring-format

https://www.python.org/dev/peps/pep-0257/

Otra forma:
http://sphinxcontrib-napoleon.readthedocs.io/en/latest/example_google.html


def sanitize_for_serialization(self, obj):
    """
    Builds a JSON POST object.

    If obj is None, return None.
    If obj is str, int, long, float, bool, return directly.
    If obj is datetime.datetime, datetime.date
        convert to string in iso8601 format.
    If obj is list, sanitize each element in the list.
    If obj is dict, return the dict.
    If obj is swagger model, return the properties dict.

    :param obj: The data to serialize.
    :return: The serialized form of data.
    """



reST format
"""
This is a reST style.

:param param1: this is a first param
:param param2: this is a second param
:returns: this is a description of what is returned
:raises keyError: raises an exception
"""
