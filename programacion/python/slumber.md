http://slumber.readthedocs.io/en/v0.6.0/tutorial.html#using

Slumber is a python library that provides a convenient yet powerful object orientated interface to ReSTful APIs. It acts as a wrapper around the excellent requests library and abstracts away the handling of urls, serialization, and processing requests.


>>> import slumber
>>> ## Connect to http://slumber.in/api/v1/ with the Basic Auth user/password of demo/demo
>>> api = slumber.API("http://slumber.in/api/v1/", auth=("demo", "demo"))
>>> ## GET http://slumber.in/api/v1/note/
>>> ##     Note: Any kwargs passed to get(), post(), put(), delete() will be used as url parameters
>>> api.note.get()
>>> ## POST http://slumber.in/api/v1/note/
>>> new = api.note.post({"title": "My Test Note", "content": "This is the content of my Test Note!"})
