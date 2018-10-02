http://www.freeformatter.com/xpath-tester.html

Para probarlo, abrir las Developer Tools de chrome, pestaña elements y Control+F. Ahí podemos poner expresiones xpath que buscaran sobre el codigo.

1. Select the document node
/

2. Select the 'root' element
/root

3. Select all 'actor' elements that are direct children of the 'actors' element.
/root/actors/actor

4. Select all 'singer' elements regardless of their positions in the document.
//foo:singer

5. Select the 'id' attributes of the 'singer' elements regardless of their positions in the document.
//foo:singer/@id

6. Select the textual value of first 'actor' element.
//actor[1]/text()

7. Select the last 'actor' element.
//actor[last()]

8. Select the first and second 'actor' elements using their position.
//actor[position() < 3]

9. Select all 'actor' elements that have an 'id' attribute.
//actor[@id]

10. Select the 'actor' element with the 'id' attribute value of '3'.
//actor[@id='3']

11. Select all 'actor' nodes with the 'id' attribute value lower or equal to '3'.
//actor[@id<=3]

11bis: ul con clase "tag-list"
//ul[@class="tag-list"]

11bis2: ul que tiene al menos la clase nav
//ul[contains(@class, 'nav')]

12. Select all the children of the 'singers' node.
/root/foo:singers/*

13. Select all the elements in the document.
//*

14. Select all the 'actor' elements AND the 'singer' elements.
//actor|//foo:singer

15. Select the name of the first element in the document.
name(//*[1])

16. Select the numeric value of the 'id' attribute of the first 'actor' element.
number(//actor[1]/@id)

17. Select the string representation value of the 'id' attribute of the first 'actor' element.
string(//actor[1]/@id)

18. Select the length of the first 'actor' element's textual value.
string-length(//actor[1]/text())

19. Select the local name of the first 'singer' element, i.e. without the namespace.
local-name(//foo:singer[1])

20. Select the number of 'singer' elements.
count(//foo:singer)

21. Select the sum of the 'id' attributes of the 'singer' elements.
sum(//foo:singer/@id)
