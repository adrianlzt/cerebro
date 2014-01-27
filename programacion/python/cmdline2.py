import getopt

def usage(argv, msg=None):
    if msg:
        print >>sys.stderr, msg
        print >>sys.stderr
    print >>sys.stderr, """\
Sphinx v%s
Usage: %s [options] sourcedir outdir [filenames...]
""" % (__version__, argv[0])


def main(argv):
    try:
        opts, args = getopt.getopt(argv[1:], 'ab:t:d:c:CD:A:nNEqQWw:PThv',
                                   ['help', 'version'])
        allopts = set(opt[0] for opt in opts)
        if '-h' in allopts or '--help' in allopts:
            usage(argv)
            print >>sys.stderr
            print >>sys.stderr, 'For more information, see '\
                '<http://sphinx-doc.org/>.'
            return 0
        if '--version' in allopts:
            print 'Sphinx (sphinx-build) %s' %  __version__
            return 0
        srcdir = confdir = abspath(args[0])
        if not path.isdir(srcdir):
            print >>sys.stderr, 'Error: Cannot find source directory `%s\'.' % (
                                srcdir,)
            return 1
        if not path.isfile(path.join(srcdir, 'conf.py')) and \
               '-c' not in allopts and '-C' not in allopts:
            print >>sys.stderr, ('Error: Source directory doesn\'t '
                                 'contain conf.py file.')
            return 1
        outdir = abspath(args[1])
    except getopt.error, err:
        usage(argv, 'Error: %s' % err)
        return 1
    except IndexError:
        usage(argv, 'Error: Insufficient arguments.')
        return 1
