http://dev.oz-apps.com/?p=265


Lua
￼
 function one()
  print("This is one")
 end

 function two()
  print("This is two")
 end

 function three()
  print("This is three")
 end

 function four()
  print("This is four")
 end
 
 function defaultFunc()
  print("This is the default function")
 end

 mySelect = {one, two, three, four}

 function selectCase(option)
  myFunc = mySelect[option]
  if myFunc ~= nil then 
    myFunc()
  else
    defaultFunc()
  end 
 end 
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
 function one()
  print("This is one")
 end
 
 function two()
  print("This is two")
 end
 
 function three()
  print("This is three")
 end
 
 function four()
  print("This is four")
 end
 
 function defaultFunc()
  print("This is the default function")
 end
 
 mySelect = {one, two, three, four}
 
 function selectCase(option)
  myFunc = mySelect[option]
  if myFunc ~= nil then 
    myFunc()
  else
    defaultFunc()
  end 
 end 
