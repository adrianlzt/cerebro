https://docs.ansible.com/playbooks_filters.html
https://github.com/ansible/ansible/blob/devel/lib/ansible/plugins/filter/core.py
  puede que haya filtros no documentados

ternary: allows for trueval/falseval assignement dependint on conditional
cartesian: returns the cartesian product of 2 lists
to_uuid: given a string it will return an ansible domain specific UUID
checksum: uses the ansible internal checksum to return a hash from a string
hash: get a hash from a string (md5, sha1, etc)
password_hash: get a hash form as string that can be used as a password in the user module (and others)
A whole set of ip/network manipulation filters: ipaddr,ipwrap,ipv4,ipv6ipsubnet,nthhost,hwaddr,macaddr


{{ list1 | union(list2) }}
{{ list1 | intersect(list2) }}
{{ list1 | difference(list2) }}


http://docs.ansible.com/ansible/playbooks_filters.html#combining-hashes-dictionaries
{{ {'a':1, 'b':2}|combine({'b':3}) }}
{'a':1, 'b':3}


{{ {'a':{'foo':1, 'bar':2}, 'b':2}|combine({'a':{'bar':3, 'baz':4}}, recursive=True) }}
{'a':{'foo':1, 'bar':3, 'baz':4}, 'b':2}

{{ a|combine(b, c, d) }}
In this case, keys in d would override those in c, which would override those in b, and so on.


