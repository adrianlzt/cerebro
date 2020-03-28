Mirar beautifulsoup.md


from lxml.etree import parse
tree = parse('status.xml')
tree.xpath('//resource[@id="haproxy"]/@role')



pcs status xml | python -c "from lxml.etree import parse; from sys import stdin; print(parse(stdin).xpath('//resource[@id=\"haproxy\"]/@role')[0])"




# Con ElementTree
from xml.etree.ElementTree import ElementTree
conf = ElementTree(file=host_xml_file)
conf.findall(...")

Para cargar desde string:
from xml.etree.ElementTree import fromstring

Subset de xpath:
https://docs.python.org/2/library/xml.etree.elementtree.html#xpath-support

Ejemplo:
conf.findall("./%sservers/%sserver[@name='SAM']" % (ns,ns))



Si tenemos namespaces:
ns = conf.getroot().tag  # Sacar de aqui el namespace
remote_domain = conf.findall("./%sdomain-controller/%sremote" % (ns, ns))
