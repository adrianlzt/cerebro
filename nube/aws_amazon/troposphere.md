http://answersforaws.com/blog/2013/10/cloudformation-templates-with-troposphere/
https://github.com/cloudtools/troposphere

sudo pip install troposphere --upgrade

vi troposphere.py
  Metemos el código (ejemplo en troposphere.py, creo que el user-data está mal, y no deja arrancar el stack)
  Mas ejemplos en https://github.com/cloudtools/troposphere/tree/master/examples
python troposphere.py > template.json


