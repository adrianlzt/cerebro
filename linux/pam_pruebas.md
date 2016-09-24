# Ejemplo con c
Creo que es viejo y no funciona
https://sources.debian.net/src/python-pam/0.4.2-13.1/examples/pamexample.c/

# Ejemplo con python
http://pam-python.sourceforge.net/examples/
https://sources.debian.net/src/python-pam/0.4.2-13.1/examples/pamtest.py/

apt-get install python-pam
pip install python-pam

#!/usr/bin/python
import PAM
auth=PAM.pam()
auth.start("adri")
try:
  auth.authenticate()
except Exception, e:
  print "Error auth: " + str(e)
else:
  print "auth ok"

try:
  auth.acct_mgmt()
except Exception, e:
  print "Error account: " + str(e)
else:
  print "account ok"

try:
  auth.open_session()
except Exception, e:
  print "Error open session: " + str(e)
else:
  print "open session ok"

try:
  auth.close_session()
except Exception, e:
  print "Error close session: " + str(e)
else:
  print "close session ok"


/etc/pam.d/adri
auth sufficient pam_permit.so
account sufficient pam_permit.so

# ./prueba.py 
login:asd
auth ok
account ok
open session ok
close session ok

----

/etc/pam.d/adri
auth sufficient pam_deny.so
account sufficient pam_permit.so

# ./prueba.py 
Error auth: ('Permission denied', 6)
account ok
login:
Error open session: ('Cannot make/remove an entry for the specified session', 14)
Error close session: ('Cannot make/remove an entry for the specified session', 14)

----

/etc/pam.d/adri
auth sufficient pam_permit.so
account sufficient pam_deny.so

# ./prueba.py 
login:asd
auth ok
Error account: ('Permission denied', 6)
open session ok
close session ok

----

/etc/pam.d/adri
auth sufficient pam_deny.so
account sufficient pam_deny.so

# ./prueba.py 
Error auth: ('Permission denied', 6)
Error account: ('Permission denied', 6)
login:vagrant
Error open session: ('Cannot make/remove an entry for the specified session', 14)
Error close session: ('Permission denied', 6)

----

/etc/pam.d/adri
auth sufficient pam_deny.so
account sufficient pam_deny.so
session sufficient pam_permit.so

# ./prueba.py 
Error auth: ('Permission denied', 6)
Error account: ('Permission denied', 6)
open session ok
close session ok
