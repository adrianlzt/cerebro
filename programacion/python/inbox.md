https://pypi.python.org/pypi/inbox.py/0.0.6

SMTP for Humans.
This is the simplest SMTP server you’ll ever see. It’s asynchronous.
One instance should handle over one thousand emails per second.



from inbox import Inbox

inbox = Inbox()

@inbox.collate
def handle(to, sender, body):
...

# Bind directly.
inbox.serve(address='0.0.0.0', port=4467)
