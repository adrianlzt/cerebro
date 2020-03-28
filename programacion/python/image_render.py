#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8

"""
Programa que crea una imagen con el texto de "file.txt"
"""

import os
# pip install Pillow
from PIL import Image, ImageDraw, ImageFont

INTERLINE_MARGIN = 5
BORDER = 10
MAX_WIDTH = 160

notosans = 'fonts/LiberationMono-Regular.ttf'
fontsize = 14
font = ImageFont.truetype(notosans, fontsize)

with open("file.txt") as fd:
    text = fd.read()

# Calcular MAX_WIDTH de la imagen segun lo que ocupen "MAX_WIDTH" caracteres
w_font, h_font = font.getsize("x"*MAX_WIDTH)

text_lines = text.split("\n")

# Margenes
w = w_font + BORDER*2
# De largo el alto de una linea por el numero de lineas
h = (len(text_lines) * (h_font + INTERLINE_MARGIN)) + BORDER*2

background = (255, 255, 255)  # blanco
foreground = (55, 59, 65)  # negro
image = Image.new('RGBA', (w, h), background)
draw = ImageDraw.Draw(image)

# Contador para marcar la posición de la siguiente linea
y_text = BORDER
for line in text_lines:
    draw.text((BORDER, y_text), line[:MAX_WIDTH], font=font, fill=foreground)
    y_text += h_font + INTERLINE_MARGIN

save_location = os.getcwd()

image.save(save_location + '/sample.jpg')
