http://agiliq.com/blog/2012/06/understanding-args-and-kwargs/

>>> def fun(a,b,c):
...   print a,b,c

>>> fun(1,2,3)
1 2 3
>>> l = [4,5,6]
>>> fun(*l)
4 5 6


TypeError: fun() argument after ** must be a mapping, not list
>>> def fun2 (a=1,b=2,c=3):
...   print a,b,c
... 
>>> fun2()
1 2 3
>>> fun2(b="hias")
1 hias 3
>>> a = {"a":"hola","b":"adios","c":"pepe"}
>>> fun2(**a)
hola adios pepe



>>> def func3(a,*args):
...   print a,args
... 
>>> func3(1,9,8,7)
1 (9, 8, 7)


>>> def func4(a,*args):
...   print a
...   for i in args:
...     print i
... 
>>> func4(1,9,8,7)
1
9
8
7


>>> def func5(**kwargs):
...   print kwargs
... 
>>> func5(a=3,z=99)
{'a': 3, 'z': 99}


>>> def func6(**kwargs):
...   print kwargs['z']
... 
>>> func6(a=3,z=99)
99


# Return multiple values #
    
>>> def func():
...     a=1
...     b=2
...     return a,b
... 
>>> x,y = func()

