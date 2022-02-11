#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#
# Copyright © 2022 adrian <adrian@archer>
#
# Distributed under terms of the MIT license.

"""
Conecta con un webrepl de micropython.
Envia la contraseña y nos deja listos para enviar o recibir datos.
"""

import websocket

def on_message(wsapp, msg):
    print(msg)
    if msg == "Password: ":
        print("enviando password")
        wsapp.send("nomeacuer\r")

ws = websocket.WebSocketApp("ws://10.42.0.205:8266", on_message=on_message)
#ws.run_forever()

