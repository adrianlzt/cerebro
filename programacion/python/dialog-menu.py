#!/usr/bin/python

import locale
from dialog import Dialog
import sys, os
import pprint
import pexpect
import signal
from blessings import Terminal
import argparse
import ConfigParser

global child

def resizeHandler(signum, frame):
    t = Terminal()

    w = t.width
    h = t.height

    child.setwinsize(h,w)

parser = argparse.ArgumentParser()


parser.add_argument('-p','--project', dest='project',help='PROYECTO',default='dsmctools')
parser.add_argument('-e','--environment', dest='environment',help='ENTORNO',choices=['PRE','PROD'],default='PROD')
parser.add_argument('-c','--config', dest='configFile',help='FICHERO DE CONFIGURACION',default='/vagrant/menu-ssh.cfg')

args = parser.parse_args()

project = args.project
environment = args.environment
configFile = args.configFile

config = ConfigParser.ConfigParser()

config.read(configFile)

ip = config.get(environment,'ip')
user = config.get(environment,'user')
password = config.get(environment,'password')
hostuser = config.get(environment,'hostuser')
hostpassword = config.get(environment,'hostpassword')

url =  'http://%s/check_mk/view.py?view_name=hostgroup&hostgroup=%s&output_format=python' % (ip,project)

try:
    command = "curl -u \"%s:%s\" -b /dev/null -L  --silent '%s'" % \
                    (user, password, url)
    output = os.popen(command).read()
    data = eval(output)

except:
    sys.stderr.write("Invalid output from URL %s:\n" % url)
    sys.stderr.write(output)
    sys.stderr.write("Command was: %s\n" % command)
    sys.exit(1)

opciones = []

index = 1
for host_data in data[1:]:

    hostname = host_data[1]
    hostalias = host_data[2]

    if (hostalias):
        opciones.append((str(index),hostalias))
    else:
        opciones.append((str(index),hostname))

    index = index + 1

    
# This is almost always a good thing to do at the beginning of your programs.
locale.setlocale(locale.LC_ALL, '')

# You may want to use 'autowidgetsize=True' here (requires pythondialog >= 3.1)
d = Dialog(dialog="dialog")
# Dialog.set_background_title() requires pythondialog 2.13 or later
d.set_background_title("Conectar por ssh y sudo")
# For older versions, you can use:
#   d.add_persistent_args(["--backtitle", "My little program"])

# In pythondialog 3.x, you can compare the return code to d.DIALOG_OK, Dialog.OK or
# "ok" (same object). In pythondialog 2.x, you have to use d.DIALOG_OK, which
# is deprecated since version 3.0.0.
code, tag = d.menu("Seleccione un servidor", choices = opciones)
if code == d.DIALOG_OK:

    host_data = data[int(tag)]

    ipaddress = host_data[3]
    child = pexpect.spawn ('ssh -t -t -t %s@%s sudo su -' % (hostuser,ipaddress))
    signal.signal(signal.SIGWINCH, resizeHandler)
    i = child.expect(['password for %s: ' % hostuser ,'password:'])
   
    # SUDO
    if ( i==0 ):
        child.sendline(hostpassword)
    else:
        child.sendline(hostpassword)
        child.expect('password for %s:' % hostuser)
        child.sendline(hostpassword)

    t = Terminal()

    w = t.width
    h = t.height

    child.setwinsize(h,w)

    child.interact()


