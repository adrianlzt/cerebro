http://stackoverflow.com/questions/231767/what-does-the-yield-keyword-do-in-python

Es una especie de "return" pero para "generators":

>>> def createGenerator():
...    mylist = range(3)
...    for i in mylist:
...        yield i*i
