http://www.crummy.com/software/BeautifulSoup/

Beautiful Soup provides a few simple methods and Pythonic idioms for navigating, searching, and modifying a parse tree: a toolkit for dissecting a document and extracting what you need. It doesn't take much code to write an application
Beautiful Soup automatically converts incoming documents to Unicode and outgoing documents to UTF-8. You don't have to think about encodings, unless the document doesn't specify an encoding and Beautiful Soup can't detect one. Then you just have to specify the original encoding.
Beautiful Soup sits on top of popular Python parsers like lxml and html5lib, allowing you to try out different parsing strategies or trade speed for flexibility.

pip install beautifulsoup4


# Doc
http://www.crummy.com/software/BeautifulSoup/bs4/doc/

# Ejemplo
from bs4 import BeautifulSoup
soup = BeautifulSoup(html_doc, 'html.parser')

with open("fichero.html") as fd:
    html = fd.read()

soup = BeautifulSoup(html, 'html.parser')
soup.title

