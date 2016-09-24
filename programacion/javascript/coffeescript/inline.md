# this...
message = evilMessage ? "Exterminate!"

# ...is equivalent to this:
if evilMessage?
   message = evilMessage
else
   message = "Exterminate!"

# ...or this:
message = if evilMessage? then evilMessage else "Exterminate!"
