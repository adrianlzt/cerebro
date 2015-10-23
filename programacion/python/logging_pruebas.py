#!/usr/bin/env python

import logging
import logging.handlers

class SkypeHandler(logging.handlers.HTTPHandler):
    def __init__(self):
        logging.handlers.HTTPHandler.__init__(self, "host", "url")

    def emit(self, record):
        #print(record.__dict__)
        print("Skype: %s" % record.skype)

class SkypeFilter(logging.Filter):
    def filter(self, record):
        try:
            return record.skype
        except AttributeError:
            return False


#FORMAT = "[%(levelname)s %(filename)s:%(lineno)s - %(funcName)20s() ] %(message)s"
#logging.basicConfig(level=logging.DEBUG, format=FORMAT)
logging.basicConfig(level=logging.DEBUG)

logger = logging.getLogger(__name__)

skype_handler = SkypeHandler()

skype_filter = SkypeFilter()
skype_handler.addFilter(skype_filter)

logger.addHandler(skype_handler)

logger.debug("test",extra={"skype":True})
logger.debug("sin nada")
