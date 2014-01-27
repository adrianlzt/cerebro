from fabric.api import run

def host_type():
    run('uname -a')

def sudo_id():
    run('sudo id')
