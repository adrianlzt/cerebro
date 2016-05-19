
u can disable interpretation of tags inside a {% raw %} block:

{% raw %}

Anything in this block is treated as raw text,
including {{ curly braces }} and
{% other block-like syntax %}

{% endraw %}
