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

