http://sysmagazine.com/posts/143241/

from inbox import Inbox

inbox = Inbox()

@inbox.collate
def handle(to, sender, body):
...

# Bind directly.
inbox.serve(address='0.0.0.0', port=4467)
