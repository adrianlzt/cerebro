http://www.tutorialspoint.com/python/python_exceptions.htm

try:
   You do your operations here;
   ......................
except ExceptionI:
   If there is ExceptionI, then execute this block.
except ExceptionII:
   If there is ExceptionII, then execute this block.
   ......................
else:
   If there is no exception then execute this block.
finally:
   This would always be executed.


try:
   fh = open("testfile", "w")
   fh.write("This is my test file for exception handling!!")
except IOError:
   print "Error: can\'t find file or read data"
else:
   print "Written content in the file successfully"
   fh.close()


Capturar varias excepciones:
except (IDontLIkeYouException, YouAreBeingMeanException) as e:


import sys
try:
    f = open('myfile.txt')
    s = f.readline()
    i = int(s.strip())
except IOError as e:
    print "I/O error({0}): {1}".format(e.errno, e.strerror)
except ValueError:
    print "Could not convert data to an integer."
except:
    print "Unexpected error:", sys.exc_info()[0]
    raise



try:
  file = open("/mnt/file","w")
except IOError as e:
  print "IO ERROR " + str(e.errno)



## Crear excepciones propias ##

class CyclopsException(Exception):
    def __init__(self, message='Cyclops is not responding properly to your request. Try again later or contact support service'):
        super(CyclopsException, self).__init__(message)

class CyclopsTaskException(CyclopsException):
    def __init__(self, status, code, message = "Task not completed"):
        self.status = status
        self.code = code

        super(CyclopsTaskException, self).__init__(message)


Lanzar una excepcion:
raise CyclopsException("Service '{}' failed: {}".format(self.name, str(e)))

try:
    funcion_que_tira_excepcion_CyclopsTaskException()
except CyclopsTaskException as e:
    print "valor de status: " + e.staus


# Lanzar una excepcion
raise Exception("Network %s not found" % network)
raise ValueError('A very specific bad thing happened')


# Traceback
Si queremos soltar un stackstrace de donde viene la excepcion: mirar traceback.md
Otra forma:
logger.exception(ex)

Estas dos formas nos sacan la cadena de funciones que han procovado la excepcion
