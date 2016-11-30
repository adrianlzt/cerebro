https://www.tutorialspoint.com/perl/perl_date_time.htm

# Epoch time
time()

Epoch a formato "localtime:
localtime(time())

# Formato
use POSIX qw(strftime);
print strftime("%Y-%m-%d %H:%M", localtime)
    2016-10-18 10:57

