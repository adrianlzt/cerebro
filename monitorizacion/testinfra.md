https://github.com/philpep/testinfra
https://testinfra.readthedocs.org/en/latest/

En ruby: serverspec.md

def test_passwd_file(File):
    passwd = File("/etc/passwd")
    assert passwd.contains("root")
    assert passwd.user == "root"
    assert passwd.group == "root"
    assert passwd.mode == 0o644
