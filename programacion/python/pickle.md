Lograr IO más alto.
Serialización

Python has an output method called a pickle, and newer versions of Python, including the version I tested (2.6.6), use a high-speed I/O package called cStringIO. Although pickling the data resulted in hitting the 4,096-byte buffer limit with 2,000 elements, it also resulted in a much smaller amount of output than with Fortran or C. Pickling your Python data can have a huge effect on Python I/O performance compared with using the classic fwrite() method.

f = open('test.bin', 'r+')
my_record = []
local_dict = {'x':0, 'y':0, 'z':0,'value':0.0};
my_record.append(local_dict)
pickle.dump(my_record,f)

