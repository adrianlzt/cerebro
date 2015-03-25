http://jinja.pocoo.org/docs/dev/templates/#for

{% for hostgroup in hostgroups %}
    <a href="{{wiki_url}}/{{hostname}}">{{wiki_url}}/{{hostname}}</a>
    <br>
{% endfor %}


Variables especiales de los loops:
https://blog.codecentric.de/en/2014/08/jinja2-better-ansible-playbooks-templates/

loop.index: The current iteration of the loop (1 indexed).
loop.index0: As before, but 0 indexed.
loop.revindex: The number of iterations from the end of the loop (1 indexed).
loop.revindex0: As above, but (0 indexed).
loop.first: True if first iteration.
loop.last: True if last iteration.
loop.length: The number of items in the sequence.
loop.depth: Indicates how deep in a recursive loop the rendering is. Starts at level 1.
loop.depth0: As before, but starting with level 0.
loop.cycle: A helper function to cycle between a list of sequences. See the Jinja documentation for more details on how to use this.
