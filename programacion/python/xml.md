Mirar beautifulsoup.md


from lxml.etree import parse
tree = parse('status.xml')
tree.xpath('//resource[@id="haproxy"]/@role')



pcs status xml | python -c "from lxml.etree import parse; from sys import stdin; print(parse(stdin).xpath('//resource[@id=\"haproxy\"]/@role')[0])"
