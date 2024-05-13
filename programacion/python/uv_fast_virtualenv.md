Sustituto de "pip" escrito en rust, mucho más rápido.

uv venv
source .venv/bin/activate
uv pip install hvac

Aún un poco limitada


Instalar un requirements.txt reproduciendo como hubiese sido en una fecha determinada
uv pip install --exclude-newer 2020-01-01 -r requirements.txt

