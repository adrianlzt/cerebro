https://docs.python.org/2/library/pprint.html

Pretty print.
Para arrys y diccionarios.


di = {"hola": "pepep", "otro" : [1,2,3,4], "cosa": {"uno": 1, "dos": "222" }}
>>> pprint.pprint(di)
{'cosa': {'dos': '222', 'uno': 1}, 'hola': 'pepep', 'otro': [1, 2, 3, 4]}

# Con logger. pformat lo convierte a una string
ds = [{'hello': 'there'}]
logging.debug(pprint.pformat(ds))

logger.info('Merged configuration:\n %s', pformat(self.config))

