# Build
clonar repo
Necesitamos java 10 para compilar (java 8 para ejecutar)

Arch linux:
  pacman -S jdk10-openjdk

Definir JAVA_HOME apuntando a java10
export JAVA_HOME=/usr/lib/jvm/java-10-openjdk/

./gradlew assemble
