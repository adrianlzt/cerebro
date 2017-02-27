#!/usr/bin/env python3
# -*- coding: utf-8 -*-
'''
lltest.py - Example file system for Python-LLFUSE.

This program presents a static file system containing a single file. It is
compatible with both Python 2.x and 3.x. Based on an example from Gerion Entrup.

Copyright © 2015 Nikolaus Rath <Nikolaus.org>
Copyright © 2015 Gerion Entrup.

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
'''

from __future__ import division, print_function, absolute_import

import os
import sys
from argparse import ArgumentParser
import stat
import logging
import errno
import llfuse
import json
from vaultcli import main as vault_main

try:
    import faulthandler
except ImportError:
    pass
else:
    faulthandler.enable()

log = logging.getLogger(__name__)

WORKSPACE_BASE_INODO = 100000
VAULT_BASE_INODO = 200000
CARD_BASE_INODO = 300000
SECRET_BASE_INODO = 400000

class TestFs(llfuse.Operations):
    """
    Asignacion de inodos:
    1xxxxx -> workspaces
    2xxxxx -> vaults
    3xxxxx -> cards
    4xxxxx -> secrets
    """
    def __init__(self, vault):
        super(TestFs, self).__init__()
        self.hello_name = b"message"
        self.hello_inode = llfuse.ROOT_INODE+1
        self.hello_data = b"hello world\n"
        self.vault = vault

    def getattr(self, inode, ctx=None):
        """
        Obtenemos las propiedades de un inodo
        Workspaces, vaults y cards son directorios
        Secrets son ficheros, se calcula su tamaño haciendo un len() al data
        """

        if ctx:
            log.info("%s (inode=%s, pid=%s, uid=%s)" % (sys._getframe().f_code.co_name, inode, ctx.pid, ctx.uid))
        else:
            log.info("%s (inode=%s, pid=, uid=)" % (sys._getframe().f_code.co_name, inode))
        entry = llfuse.EntryAttributes()
        # Todo lo que no sean secrets son directorios
        if inode < SECRET_BASE_INODO:
            log.debug("Calificamos este inodo como directorio")
            entry.st_mode = (stat.S_IFDIR | 0o755)
            entry.st_size = 0
        else:
            log.debug("Calificamos este inodo como fichero")
            entry.st_mode = (stat.S_IFREG | 0o644)
            secret_id = inode - SECRET_BASE_INODO
            log.debug("Obteniendo len(get_secret(%s).data)", secret_id)
            data = bytes(json.dumps(self.vault.get_secret(secret_id).data), "UTF-8")
            entry.st_size = len(data)

        stamp = int(1438467123.985654 * 1e9)
        entry.st_atime_ns = stamp
        entry.st_ctime_ns = stamp
        entry.st_mtime_ns = stamp
        entry.st_gid = os.getgid()
        entry.st_uid = os.getuid()
        entry.st_ino = inode

        return entry

    def _get_id_from_name(self, elements, name):
        """
        A partir de una lista de elementos, obtenemos el id segun el nombre
        Si hay dos elementos con el mismo nombre retornamos el primero
        """
        # TODO: fallar si se encuentran dos elementos en el filtrado
        filter_list = list(filter(lambda w: w.name == str(name, "UTF-8"), elements))
        if len(filter_list) != 1:
            raise llfuse.FUSEError(errno.ENOENT)
        return filter_list.pop().id

    def lookup(self, parent_inode, name, ctx=None):
        """
        Obtener los atributos de un elemento por su nombre
        """
        log.info("%s (parent_inode=%s, name=%s, pid=%s, uid=%s)" % (sys._getframe().f_code.co_name, parent_inode, name, ctx.pid, ctx.uid))
        inode = None

        if parent_inode == 1:
            log.info("ROOT path del punto de montaje. Retornar workspaces")
            wks = self.vault.list_workspaces()
            inode = self._get_id_from_name(wks, name) + WORKSPACE_BASE_INODO
        elif parent_inode >= WORKSPACE_BASE_INODO and parent_inode < VAULT_BASE_INODO:
            log.info("Es un workspace. Retornar vaults")
            wks_id = parent_inode - WORKSPACE_BASE_INODO
            vaults = self.vault.list_vaults(wks_id)
            inode = self._get_id_from_name(vaults, name) + VAULT_BASE_INODO
        elif parent_inode >= VAULT_BASE_INODO and parent_inode < CARD_BASE_INODO:
            log.info("Es un vault. Retornar cards")
            vault_id = parent_inode - VAULT_BASE_INODO
            cards = self.vault.list_cards(vault_id)
            inode = self._get_id_from_name(cards, name) + CARD_BASE_INODO
        elif parent_inode >= CARD_BASE_INODO and parent_inode < SECRET_BASE_INODO:
            log.info("Es una card. Retornar secrets")
            card_id = parent_inode - CARD_BASE_INODO
            secrets = self.vault.list_secrets(card_id)
            inode = self._get_id_from_name(secrets, name) + SECRET_BASE_INODO
        else:
            log.info("Es un secret. Retornar el contenido")

        if not inode:
            raise llfuse.FUSEError(errno.ENOENT)

        return self.getattr(inode, ctx)

    def opendir(self, inode, ctx):
        """
        Aqui transformamos el inodo en un filehandle que se pasara a reddir, fsyncdir y releasedir
        para reconocer este directorio. Debe retornase un int
        Para simplificar, pasamos el mismo id del inodo
        """
        log.info("%s (inode=%s, pid=%s, uid=%s)" % (sys._getframe().f_code.co_name, inode, ctx.pid, ctx.uid))
        return inode

    def readdir(self, fh, off):
        """
        Para el directorio indicado por el filehandler (fh, en nuestro caso el numero del inodo),
        Debe retornar un iterador que devuelva tuplas (name, attr, next_)
        """
        log.info("%s (fh=%s, off=%s)" % (sys._getframe().f_code.co_name, fh, off))

        if fh == 1:
            log.info("ROOT path del punto de montaje. Retornar workspaces")
            for i,v in enumerate(self.vault.list_workspaces()):
                # Skip elementos segun off
                if off > i:
                    continue
                log.debug("Yield (%s, attr, %s)", v.name, i)
                yield(bytes(v.name, "UTF-8"), self.getattr(v.id+WORKSPACE_BASE_INODO), i+1)
        elif fh >= WORKSPACE_BASE_INODO and fh < VAULT_BASE_INODO:
            log.info("Es un workspace. Retornar vaults")
            idx = fh - WORKSPACE_BASE_INODO
            log.debug("Obteniendo vaults para el workspace %s", idx)
            for i,v in enumerate(self.vault.list_vaults(idx)):
                # Skip elementos segun off
                if off > i:
                    continue
                log.debug("Yield (%s, attr, %s)", v.name, i)
                yield(bytes(v.name, "UTF-8"), self.getattr(v.id+VAULT_BASE_INODO), i+1)
        elif fh >= VAULT_BASE_INODO and fh < CARD_BASE_INODO:
            log.info("Es un vault. Retornar cards")
            idx = fh - VAULT_BASE_INODO
            log.debug("Obteniendo cards para el vault %s", idx)
            for i,v in enumerate(self.vault.list_cards(idx)):
                # Skip elementos segun off
                if off > i:
                    continue
                log.debug("Yield (%s, attr, %s)", v.name, i)
                yield(bytes(v.name, "UTF-8"), self.getattr(v.id+CARD_BASE_INODO), i+1)
        elif fh >= CARD_BASE_INODO and fh < SECRET_BASE_INODO:
            log.info("Es una card. Retornar secrets")
            idx = fh - CARD_BASE_INODO
            log.debug("Obteniendo secrets para la card %s", idx)
            for i,v in enumerate(self.vault.list_secrets(idx)):
                # Skip elementos segun off
                if off > i:
                    continue
                log.debug("Yield (%s, attr, %s)", v.name, i)
                yield(bytes(v.name, "UTF-8"), self.getattr(v.id+SECRET_BASE_INODO), i+1)
        else:
            log.info("Es un secret. Retornar el contenido")


    def open(self, inode, flags, ctx):
        """
        Retorna un filehandler con el fichero abierto.
        Aqui se puede filtrar segun las flags (si queremos abrirlo para lectura o escritura)
        Por ahora retornamos el mismo inodo
        """
        log.info("%s (inode=%s, flags=%s, pid=%s, uid=%s)" % (sys._getframe().f_code.co_name, inode, flags, ctx.pid, ctx.uid))
        #if inode != self.hello_inode:
        #    raise llfuse.FUSEError(errno.ENOENT)
        #if flags & os.O_RDWR or flags & os.O_WRONLY:
        #    raise llfuse.FUSEError(errno.EPERM)
        return inode

    def read(self, fh, off, size):
        """
        Leemos 'size' bytes del fichero 'fh' empezando en 'off'
        Si paasmos mas bytes que los especificados en 'size', la salida sera truncada igualmente
        """
        log.info("%s (fh=%s, off=%s, size=%s)" % (sys._getframe().f_code.co_name, fh, off, size))
        secret_id = fh - SECRET_BASE_INODO
        data = bytes(json.dumps(self.vault.get_secret(secret_id).data), "UTF-8")
        return data[off:off+size]

def init_logging(debug=False):
    #formatter = logging.Formatter('%(asctime)s.%(msecs)03d %(threadName)s: '
    #                              '[%(name)s] %(message)s', datefmt="%Y-%m-%d %H:%M:%S")
    formatter = logging.Formatter('%(filename)s:%(lineno)s - %(message)s', datefmt="%Y-%m-%d %H:%M:%S")
    handler = logging.StreamHandler()
    handler.setFormatter(formatter)
    root_logger = logging.getLogger()
    if debug:
        handler.setLevel(logging.DEBUG)
        root_logger.setLevel(logging.DEBUG)
    else:
        handler.setLevel(logging.INFO)
        root_logger.setLevel(logging.INFO)
    root_logger.addHandler(handler)

def parse_args():
    '''Parse command line'''

    parser = ArgumentParser()

    parser.add_argument('mountpoint', type=str,
                        help='Where to mount the file system')
    parser.add_argument('--debug', action='store_true', default=False,
                        help='Enable debugging output')
    parser.add_argument('--debug-fuse', action='store_true', default=False,
                        help='Enable FUSE debugging output')
    return parser.parse_args()


def main():
    options = parse_args()
    init_logging(options.debug)

    # Inicializamos el cliente de vault
    class FakeConf(object):
        config = None
    fake_config = FakeConf()
    vault = vault_main.configure_client(fake_config)

    testfs = TestFs(vault)
    fuse_options = set(llfuse.default_options)
    fuse_options.add('fsname=lltest')
    if options.debug_fuse:
        fuse_options.add('debug')
    llfuse.init(testfs, options.mountpoint, fuse_options)
    try:
        log.info("Arrancando...")
        llfuse.main(workers=1)
    except:
        llfuse.close(unmount=False)
        raise

    llfuse.close()


if __name__ == '__main__':
    main()
