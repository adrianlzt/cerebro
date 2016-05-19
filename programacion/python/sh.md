https://amoffat.github.io/sh/

sh (previously pbs) is a full-fledged subprocess interface for Python that allows you to call any program as if it were a function:

from sh import ifconfig
print(ifconfig("wlan0"))

checkout master branch
git.checkout("master")

print(the contents of this directory
print(ls("-l"))


# Return code
If a process ends with an error, and the exit code is not 0, an exception is generated dynamically. This lets you catch a specific return code, or catch all error return codes through the base class ErrorReturnCode:

try:
    print(ls("/some/non-existant/folder"))
except ErrorReturnCode_2:
    print("folder doesn't exist!")
    create_the_folder()
except ErrorReturnCode:
    print("unknown error")
    exit(1)

Note Signals will not raise an ErrorReturnCode. The command will return as if it succeeded, but its exit_code property will be set to -signal_num. So, for example, if a command is killed with a SIGHUP, its return code will be -1.
