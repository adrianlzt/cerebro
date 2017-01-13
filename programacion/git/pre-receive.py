#!/usr/bin/env python
# Modificado de:
# https://gist.github.com/troelskn/1325799
#
import sys
import os
import subprocess

def git(args, **kwargs):
    environ = os.environ.copy()
    if 'repo' in kwargs:
        environ['GIT_DIR'] = kwargs['repo']
    if 'work' in kwargs:
        environ['GIT_WORK_TREE'] = kwargs['work']
    proc = subprocess.Popen(args, stdout=subprocess.PIPE, env=environ)
    return proc.communicate()

def get_changed_files(base, commit, **kw):
    (results, code) = git(('git', 'diff', '--numstat', '--name-only', "%s..%s" % (base, commit)), **kw)
    return results.decode("utf-8").strip().split('\n')

def get_new_file(filename, commit):
    (results, code) = git(('git', 'show', '%s:%s' % (commit, filename)))
    return results.decode("utf-8")

repo = os.getcwd()
basedir = os.path.join(repo, "..")

line = sys.stdin.read()
(base, commit, ref) = line.strip().split()
print("base: ", base)
print("commit: ", commit)
print("ref: ", ref)
modified = get_changed_files(base, commit)

# print files modified and its content
for fname in modified:
    print("=====", fname)
    print(get_new_file(fname, commit))
