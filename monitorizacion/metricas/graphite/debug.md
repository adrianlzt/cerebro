# The manhole interface allows you to SSH into the carbon daemon
# and get a python interpreter. BE CAREFUL WITH THIS! If you do
# something like time.sleep() in the interpreter, the whole process
# will sleep! This is *extremely* helpful in debugging, assuming
# you are familiar with the code. If you are not, please don't
# mess with this, you are asking for trouble :)
#
# ENABLE_MANHOLE = False
# MANHOLE_INTERFACE = 127.0.0.1
# MANHOLE_PORT = 7222
# MANHOLE_USER = admin
# MANHOLE_PUBLIC_KEY = ssh-rsa AAAAB3NzaC1yc2EAAAABiwAaAIEAoxN0sv/e4eZCPpi3N3KYvyzRaBaMeS2RsOQ/cDuKv11dlNzVeiyc3RFmCv5Rjwn/lQ79y0zyHxw67qLyhQ/kDzINc4cY41ivuQXm2tPmgvexdrBv5nsfEpjs3gLZfJnyvlcVyWK/lId8WUvEWSWHTzsbtmXAF2raJMdgLTbQ8wE=

