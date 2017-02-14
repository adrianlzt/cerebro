#! /usr/bin/env python
# -*- coding: utf-8 -*-
# vim:fenc=utf-8
#
# Copyright © 2017 Adrián López Tejedor <adrianlzt@gmail.com>
#
# Distributed under terms of the GNU GPLv3 license.

"""

"""

from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5
import binascii

class WorkSpaceCypher(object):
    def __init__(self, priv_key=None, pub_key=None):
        """
        priv_key: texto ascii con la clave privada
        pub_key: texto ascii con la clave publica
        """
        if priv_key:
            self.set_priv_key(priv_key)
        if pub_key:
            self.set_pub_key(pub_key)

    def set_priv_key(self, priv_key):
        key = RSA.importKey(priv_key)
        self.priv = PKCS1_v1_5.new(key)

    def set_pub_key(self, pub_key):
        key = RSA.importKey(pub_key)
        self.pub = PKCS1_v1_5.new(key)

    def encrypt(self, text):
        """
        Retorna una string en base64 de los datos codificados
        """
        crypted = self.pub.encrypt(text)
        crypted_b64 = binascii.b2a_base64(crypted)
        return crypted_b64

    def decrypt(self, base64_text):
        """
        Retorna una string con el texto desencryptado
        """
        raw_cipher_data = binascii.a2b_base64(base64_text)
        decrypted = self.priv.decrypt(raw_cipher_data,'')
        return decrypted

priv = open("vaultier.key.docker.adrianlzt", "r").read()
pub = open("vaultier.key.docker.adrianlzt.pub", "r").read()
wc = WorkSpaceCypher(priv, pub)

cosas = "mis datos majos"
encrypted = wc.encrypt(cosas)
print("Encriptadas: %s" % encrypted)

mis_datos = wc.decrypt(encrypted)
print("Datos desencriptados: %s" % mis_datos)


data = "RllWZf72oLD7P8xuRi1BI8lN+MBsX4PjDahazxXyyCI5sLo4Yd5OMjTNRikQny5UUWFX0JYQDoqzZYNRBMlOdouI92nCv5p3K+0J+RvRpuRLQ+HGtHCmuYofQ+SfczpqT6GGCtB3cf1FACYvUFrdHTsIBhx4SCCdVtRlgy7vays3DRK/FWXv0ZZaWPGaAdL7p+3sjHi38TBIQZqQOxfqca9zPNMKL+BYAY6l50CPk4ZV8hQhVBdRuQxIvS1EIwjJHuVPQ8YsVpZ+IdW+2x8QcsQsZ9DSVAt3TSYPoauu7U8sV7BIcf+MvSdCc4tljci6XJ+jbUBgvoFJUHp1+LgO/g=="
wk_key = wc.decrypt(data)

print("clave en hex: %s" % binascii.b2a_hex(wk_key))
