#!/usr/bin/env python

import logging
import logging.handlers

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

http_handler = logging.handlers.HTTPHandler(
    'localhost:8000',
    '/PATHLOG/',
    method='POST',
)
logger.addHandler(http_handler)

logger.debug("test")



#
# Traza enviada
#
# POST /PATHLOG/ HTTP/1.0
# Host: localhost
# Content-type: application/x-www-form-urlencoded
# Content-length: 327
# 
# threadName=MainThread&name=__main__&thread=140338905409280&created=1445249324.9&process=4536&processName=MainProcess&args=%28%29&module=traza&filename=traza.py&levelno=10&exc_text=None&pathname=.%2Ftraza.py&lineno=16&msg=test&exc_info=None&funcName=%3Cmodule%3E&relativeCreated=8.49390029907&levelname=DEBUG&msecs=900.434017181
#
