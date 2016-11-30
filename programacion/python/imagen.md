https://github.com/python-pillow/Pillow
pip install Pillow

Version solo para py2
http://www.pythonware.com/products/pil/
http://effbot.org/imagingbook/pil-index.htm

The Python Imaging Library (PIL) adds image processing capabilities to your Python interpreter. This library supports many file formats, and provides powerful image processing and graphics capabilities.


# Leer pixeles en una imagen
from PIL import Image
im = Image.open("dead_parrot.jpg") #Can be many different formats.
pix = im.load()
print im.size #Get the width and hight of the image for iterating over
print pix[x,y] #Get the RGBA Value of the a pixel of an image
pix[x,y] = value # Set the RGBA Value of the image (tuple)


# Crop
from PIL import Image
im = Image.open("A.png")
nueva = im.crop((0,0,640,618))
nueva.save("nueva.png")


# Imagene bajada con requests
from PIL import Image
import requests
from io import BytesIO

response = requests.get(url)
img = Image.open(BytesIO(response.content))


# Unir imagenes
http://stackoverflow.com/a/30228308/1407722
