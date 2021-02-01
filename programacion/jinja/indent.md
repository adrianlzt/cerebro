https://jinja.palletsprojects.com/en/master/templates/#indent
Identar una variable

Ejemplo, si tenemos una variable multilínea y la tenemos que meter en un yaml

Ejemplo:
              privateKeySource:
                directEntry:
                  privateKey: |
                    {{jenkins_ansible_ssh_key  | indent(20, False)}}



jenkins_ansible_ssh_key será un valor multilínea.
La primera linea no se identará (ya lo está).
Las siguientes del multilinea se identarán 20 posiciones, quedando alineadas con la primera de jenkins_ansible_ssh_key

              privateKeySource:
                directEntry:
                  privateKey: |
                    -----BEGIN OPENSSH PRIVATE KEY-----
                    b3BlbnNzaC1rZXktdjEAAAAABG5vbmUAAAAEbm9uZQAAAAAAAAABAAABlwAAAAdzc2gtcn
                    NhAAAAAwEAAQAAAYEAyC3zMEMpUK0rPBguOPwBPIrakvPjI652pMRyDtCK3ULn7lI+Qjl9
                    AiJOdiBllylFwIAk5ewtekW8ICAQnV0DwfGi2InfN/HsHzqtMoF1vmN9k195R7NnLA/0qn

