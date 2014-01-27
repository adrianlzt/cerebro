http://www.zugiart.com/wiki/bash/#Processes and Lifecycle Management


$$        #PID of current process
$PPID     #PID of parent of current process
$!        #PID of last backgrounded process (as mentioned above).
 
# Subprocess & PID, example using $! variable
. /fire/off/some/commands/somewhere.sh
childpid=$!
echo "child pid of spawned command is $childpid"




runChildProcess &
childpid=$!
# enter a loop that monitor childpid presence, and exit
# only when child pid is gone
while  true ; do
	ps -lfp $childpid;
	if  $? == 0 ;
		echo "child is still running..."
	else
		echo "child pid is terminated"
	break
fi
done
echo "parent process completes execution"



runChildProcess &
childpid=$!
wait $childpid
echo "parent process completes execution"
