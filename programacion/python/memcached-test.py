# run this command if import memcache fails
# pip install python-memcached

import memcache

ip = 'localhost'
port = 49153

mc = memcache.Client(["{0}:{1}".format(ip, port)], debug=0)
mc.set("MDM", "Guillaume J. C.")
value = mc.get("MDM")

print value
