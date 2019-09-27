Tamaño de un array:
{{ groups['maingroup'] | length }}


Solucionar problema de cuando un array nos pone los elementos como
[u'a', u'b']
https://stackoverflow.com/questions/41521138/ansible-template-adds-u-to-array-in-template
{{ value | to_json }}


# Unir
{{ ["a","b"] | union(["c"]) }}
