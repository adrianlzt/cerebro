Respecto a sudo, fabric funciona como si tuviese tty

from fabric.api import run,sudo

def restart_icinga():
    sudo('service icinga restart')
