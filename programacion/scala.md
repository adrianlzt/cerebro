http://www.scala-lang.org/

Object-Oriented Meets Functional
Have the best of both worlds. Construct elegant class hierarchies for maximum code reuse and extensibility, implement their behavior using higher-order functions. Or anything in-between.


http://www.scala-lang.org/documentation/getting-started.html


The scalac command compiles one (or more) Scala source file(s) and generates Java bytecode which can be executed on any standard JVM. 


Se puede usar también como scripting:
#!/bin/sh
exec scala "$0" "$@"
!#
object HelloWorld extends App {
  println("Hello, world!")
}
HelloWorld.main(args)
