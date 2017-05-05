git clone https://github.com/jenkinsci/jenkins.git
cd jenkins
git checkout jenkins-xx.xx
mvn clean install -pl war -am -DskipTests

