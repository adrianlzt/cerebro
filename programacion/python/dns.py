"""
Resolver una IP usando un NS determinado, usando solo la standar lib

One liner:
python3 -c "import dns.resolver; my_resolver = dns.resolver.Resolver(); my_resolver.nameservers = ['1.1.1.1']; print(my_resolver.query('cisco.com').response)"
"""

import dns.resolver
my_resolver = dns.resolver.Resolver()
my_resolver.nameservers = ['8.8.8.8']
# Timeout por defecto: 30s
answer = my_resolver.query('google.com')
print(answer.response)
