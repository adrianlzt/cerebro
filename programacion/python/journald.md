https://github.com/systemd/python-systemd

from systemd import journal
journal.send("hola")

import logging
from systemd.journal import JournalHandler
log = logging.getLogger('demo')
log.addHandler(JournalHandler())
log.setLevel(logging.INFO)
log.info("sent to journal")

