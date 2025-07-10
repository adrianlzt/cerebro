Necesitamos crear una cuenta en pypi.

Tendremos que tener un pyproject.toml

Usamos 'twine' para chequear si está listo y para pushear.

También es recomendable hacerlo en test.pypi.com y subir ahí antes:

```bash
TWINE_USERNAME=__token__ TWINE_PASSWORD=your_token_here python -m twine upload --repository testpypi dist/*
```
