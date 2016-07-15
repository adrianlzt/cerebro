import os
print os.environ['HOME']

# using get will return `None` if a key is not present rather than raise a `KeyError`
print os.environ.get('KEY_THAT_MIGHT_EXIST')

# os.getenv is equivalent, and can also give a default value instead of `None`
print os.getenv('KEY_THAT_MIGHT_EXIST', default_value)

os.putenv(varname, value)
Set the environment variable named varname to the string value. Such changes to the environment affect subprocesses started with os.system(), popen() or fork() and execv().

When putenv() is supported, assignments to items in os.environ are automatically translated into corresponding calls to putenv(); however, calls to putenv() don’t update os.environ, so it is actually preferable to assign to items of os.environ.


Bucle sobre todas las variables de entorno:
for k,v in os.environ.iteritems():
    print(k,v)
