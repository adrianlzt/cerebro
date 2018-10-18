#!/bin/sh

DIRNAME=`dirname "$0"`
GREP="grep"

# Use the maximum available, or set MAX_FD != -1 to use that
MAX_FD="maximum"

# OS specific support (must be 'true' or 'false').
cygwin=false;
case "`uname`" in
    CYGWIN*)
        cygwin=true
        ;;
esac

# For Cygwin, ensure paths are in UNIX format before anything is touched
if $cygwin ; then
    [ -n "$JBOSS_HOME" ] &&
        JBOSS_HOME=`cygpath --unix "$JBOSS_HOME"`
    [ -n "$JAVA_HOME" ] &&
        JAVA_HOME=`cygpath --unix "$JAVA_HOME"`
    [ -n "$JAVAC_JAR" ] &&
        JAVAC_JAR=`cygpath --unix "$JAVAC_JAR"`
fi

# Setup JBOSS_HOME
RESOLVED_JBOSS_HOME=`cd "$DIRNAME/.."; pwd`
if [ "x$JBOSS_HOME" = "x" ]; then
    # get the full path (without any relative bits)
    JBOSS_HOME=$RESOLVED_JBOSS_HOME
else
 SANITIZED_JBOSS_HOME=`cd "$JBOSS_HOME"; pwd`
 if [ "$RESOLVED_JBOSS_HOME" != "$SANITIZED_JBOSS_HOME" ]; then
   echo "WARNING JBOSS_HOME may be pointing to a different installation - unpredictable results may occur."
   echo ""
 fi
fi
export JBOSS_HOME

# Setup the JVM
if [ "x$JAVA_HOME" = x ]; then
   fail_java_home () {
        echo "JAVA_HOME is not set. Unable to locate the jars needed to run jconsole."
        exit 2
   }

   JCONSOLE_PATH=`which jconsole` || fail_java_home
   which readlink || fail_java_home # make sure readlink is present
   JCONSOLE_TEST=`readlink "$JCONSOLE_PATH"`
   while [ x"$JCONSOLE_TEST" != x ]; do
      JCONSOLE_PATH="$JCONSOLE_TEST"
      JCONSOLE_TEST=`readlink "$JCONSOLE_PATH"`
   done
   JAVA_HOME=`dirname "$JCONSOLE_PATH"`
   JAVA_HOME=`dirname "$JAVA_HOME"`
fi

# For Cygwin, switch paths to Windows format before running java
if $cygwin; then
    JBOSS_HOME=`cygpath --path --windows "$JBOSS_HOME"`
    JAVA_HOME=`cygpath --path --windows "$JAVA_HOME"`
fi

CLASSPATH=$JAVA_HOME/lib/jconsole.jar
CLASSPATH=$CLASSPATH:$JAVA_HOME/lib/tools.jar
CLASSPATH="$CLASSPATH:$JBOSS_HOME/bin/client/jboss-cli-client.jar"

echo CLASSPATH $CLASSPATH

if [ "x$JBOSS_MODULEPATH" = "x" ]; then
    JBOSS_MODULEPATH="$JBOSS_HOME/modules"
fi

#$JAVA_HOME/bin/jconsole -J-Djava.class.path="$CLASSPATH" -J-Dmodule.path="$JBOSS_MODULEPATH" "$@"

/usr/lib/jvm/default/bin/java -Djdk.home=/usr/lib/jvm/default -classpath /usr/share/visualvm/platform/lib/boot.jar:/usr/share/visualvm/platform/lib/org-openide-modules.jar:/usr/share/visualvm/platform/lib/org-openide-util.jar:/usr/share/visualvm/platform/lib/org-openide-util-lookup.jar:/usr/share/visualvm/platform/lib/org-openide-util-ui.jar:/usr/lib/jvm/default/lib/dt.jar:/usr/lib/jvm/default/lib/tools.jar:$CLASSPATH -Dnetbeans.dirs=/usr/share/visualvm/visualvm:/usr/share/visualvm/profiler: -Dnetbeans.home=/usr/share/visualvm/platform -Dawt.useSystemAAFontSettings=on -client -Xms24m -Xmx256m -Dnetbeans.accept_license_class=com.sun.tools.visualvm.modules.startup.AcceptLicense -Dsun.jvmstat.perdata.syncWaitMs=10000 -Dsun.java2d.noddraw=true -Dsun.java2d.d3d=false -Dorg.netbeans.core.TimeableEventQueue.quantum=360000 --add-exports=java.desktop/sun.awt=ALL-UNNAMED --add-exports=jdk.internal.jvmstat/sun.jvmstat.monitor.event=ALL-UNNAMED --add-exports=jdk.internal.jvmstat/sun.jvmstat.monitor=ALL-UNNAMED --add-exports=java.desktop/sun.swing=ALL-UNNAMED --add-exports=jdk.attach/sun.tools.attach=ALL-UNNAMED --add-opens=java.base/java.net=ALL-UNNAMED --add-opens=java.base/java.lang.ref=ALL-UNNAMED --add-opens=java.base/java.lang=ALL-UNNAMED --add-opens=java.desktop/javax.swing=ALL-UNNAMED --add-opens=java.desktop/javax.swing.plaf.basic=ALL-UNNAMED -XX:+IgnoreUnrecognizedVMOptions -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=/home/adrian/.visualvm/1.4/var/log/heapdump.hprof -splash:/home/adrian/.cache/visualvm/1.4/splash.png org.netbeans.Main --cachedir /home/adrian/.cache/visualvm/1.4 --userdir /home/adrian/.visualvm/1.4 --branding visualvm
