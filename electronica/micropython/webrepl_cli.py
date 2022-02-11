#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#
# Copyright © 2022 adrian <adrian@archer>
#
# Distributed under terms of the MIT license.

"""
Conectar via websockets con el webrepl de micropython.
El tema de como gestiono el echo no está muy conseguido, así que se ve tanto lo que escribo como
el echo que me devuelve más la respuesta.

Ejemplo de ejecución:
    python webrepl_cli.py ws://10.42.0.205:8266 MIPASS

Para cerrar la conex poner "exit"
"""

import websocket
import sys
from threading import Thread

# Valores a definir. También podemos pasarlo por la línea de comandos.
WEBREPL_PASSWORD = "RELLENAR"
WEBREPL_URL = "ws://IP:PUERTO"


def on_message(ws, message):
    # Print message without newline.
    print(message, end="")
    if message == "Password: ":
        print("enviando password")
        ws.send(f"{WEBREPL_PASSWORD}\r")

def on_error(ws, error):
    print(error)


def on_close(ws, close_status_code, close_msg):
    print("### closed ###")


def on_open(ws):
    def run(*args):
        while True:
            msg = input()
            if msg == "exit":
                break
            ws.send(msg+'\r')

        ws.close()
        print("Thread terminating...")

    Thread(target=run).start()


if __name__ == "__main__":
    #websocket.enableTrace(True) # debugging de la conex
    host = WEBREPL_URL

    if len(sys.argv) == 2:
        host = sys.argv[1]
    elif len(sys.argv) == 3:
        host = sys.argv[1]
        WEBREPL_PASSWORD = sys.argv[2]

    ws = websocket.WebSocketApp(host,
                                on_message=on_message,
                                on_error=on_error,
                                on_close=on_close)
    ws.on_open = on_open
    ws.run_forever()
