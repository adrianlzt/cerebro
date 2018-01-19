https://github.com/philpep/testinfra
https://testinfra.readthedocs.org/en/latest/
En ruby: serverspec.md

Para correr tests sobre docker mirar virtualizacion/docker/tests.md

Para ejecutar testinfra
pip install testinfra
py.test fichero.py



Ejemplo:

def test_passwd_file(File):
    passwd = File("/etc/passwd")
    assert passwd.contains("root")
    assert passwd.user == "root"
    assert passwd.group == "root"
    assert passwd.mode == 0o644
