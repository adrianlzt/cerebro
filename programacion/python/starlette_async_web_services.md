Starlette is a lightweight ASGI framework/toolkit, which is ideal for building async web services in Python.
Usar mejor fastapi, que usa a su vez starlette.

Ejemplo:
```
from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.routing import Route


async def homepage(request):
    return JSONResponse({'hello': 'world'})


app = Starlette(debug=True, routes=[
    Route('/', homepage),
])
```
