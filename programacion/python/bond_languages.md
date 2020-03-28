https://pypi.python.org/pypi/python-bond

Ejecutar código de otros lenguajes en python


# quickjs
Ejecutar código javascript en python
https://github.com/PetterS/quickjs
pip install quickjs

https://stackoverflow.com/a/58637725/1407722

from quickjs import Function

js = """
function escramble_758(){
var a,b,c
a='+1 '
b='84-'
a+='425-'
b+='7450'
c='9'
document.write(a+c+b)
escramble_758()
}
"""

escramble_758 = Function('escramble_758', js.replace("document.write", "return "))

print(escramble_758())
