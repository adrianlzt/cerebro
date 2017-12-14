{{ dict.value }}

# Loops
http://blog.mattcrampton.com/post/31254835293/iterating-over-a-dict-in-a-jinja-template

{% for key, value in _dict.iteritems() %}
      <dt>{{ key }}</dt>
      <dd>{{ value }}</dd>
{% endfor %}
