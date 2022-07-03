https://github.com/tiangolo/fastapi

Para crear servers webs API REST JSON de manera rápida.



# Ejemplo evitando logging duplicado
```
import uvicorn     ■ Import "uvicorn" could not be resolved
from fastapi import FastAPI, Response     ■ "Response" is not 

import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Avoid duplicate fastapi logging
console_handler = logging.StreamHandler()
logging.getLogger('uvicorn.error').propagate = True
logging.getLogger('uvicorn.error').addHandler(console_handler)
logging.getLogger('uvicorn.error').level = logging.INFO
logging.getLogger('uvicorn').propagate = False
logging.getLogger('uvicorn').addHandler(console_handler)
logging.getLogger('uvicorn').level = logging.INFO

app = FastAPI()

logger.info("test")
uvicorn.run(app, host="0.0.0.0", port=12323)
```
