https://discuss.streamlit.io/t/how-to-embed-javascript-into-streamlit/20152/4

```
import streamlit as st
from streamlit.components.v1 import html

# Define your javascript
my_js = """
alert("Hola mundo");
"""

# Wrapt the javascript as html code
my_html = f"<script>{my_js}</script>"

# Execute your app
st.title("Javascript example")
html(my_html)
```
