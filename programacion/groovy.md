http://groovy-lang.org/
http://groovy-lang.org/semantics.html
repl online: https://groovyconsole.appspot.com/ no funciona muy bien, hace cosas raras con los cambios de linea. Usar groovysh o la groovyConsole


Groovy...
is an agile and dynamic language for the Java Virtual Machine
builds upon the strengths of Java but has additional power features inspired by languages like Python, Ruby and Smalltalk
makes modern programming features available to Java developers with almost-zero learning curve
provides the ability to statically type check and statically compile your code for robustness and performance
supports Domain-Specific Languages and other compact syntax so your code becomes easy to read and maintain
makes writing shell and build scripts easy with its powerful processing primitives, OO abilities and an Ant DSL
increases developer productivity by reducing scaffolding code when developing web, GUI, database or console applications
simplifies testing by supporting unit testing and mocking out-of-the-box
seamlessly integrates with all existing Java classes and libraries
compiles straight to Java bytecode so you can use it anywhere you can use Java


# Install
sudo pacman -S groovy
groovy file.groovy
groovysh
  repl
groovyConsole
  interfaz x11 para hacer pruebas REPL


# Syntax
def foo = 123  // def hace que se autodescrubra el tipo de dato
def vacia = null
b = "hola" // global? creo que si no la defino dentro de una clase será una global de la clase implicita autogenerada
println "hola $foo"

## Scope vars
https://stackoverflow.com/questions/15619216/groovy-scope-how-to-access-script-variable-in-a-method


## environment vars
def env = System.getenv()
println "${env.PATH}"

## Diccionarios
foo['USERNAME']
foo.get("PATH")
  ambos devuelven null si no existe la key


# methods / funciones
def call(message, endpoint='', room='0') {

Podemos tener varias funciones con el mismo nombre y distintos parámetros. Se usará una u otra según cuadren los parámetros.


Sacar todos los métodos de un objeto:
println new Person().metaClass.methods*.name.sort().unique()




# condicionales
if ( a == 1 && b == 2 ) {
    ...
} else if (!x) {
    ...
} else {
    ...
}


# Loops
env.each {
  println it
}



# Operador ?
if ( a?.b ) { .. }

is same as

if ( a != null && a.b ) { .. }


# URL
def serverURL = "http://somesrv.example.com"
def appURL = "http://myapp.example.com"

def concat = new URIBuilder(serverURL)
concat.setPath("/fizz")
concat.addQueryParam("widget", appURL)

println concat
http://somesrv.example.com/fizz?widget=http%3A%2F%2Fmyapp.example.com



# Ficheros
def pass = new File("/run/secrets/jenkins-pass").text.trim()


# Cast variables
(String) 2



# Array
http://grails.asia/groovy-array-manipulation-examples
http://mrhaki.blogspot.fr/2015/09/groovy-goodness-removing-elements-from.html

def testArray = new String[3]
testArray[0] = "A"

testArray.pop() -> ultimo elemento
testArray.remoteAt(0) -> primer elemento


# Strings
## Split
String[] split(String regex)

"hola pepe".split(" ")
