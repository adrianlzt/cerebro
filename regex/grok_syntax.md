# enable or disable debugging. Debug is set false by default.
# the 'debug' setting is valid at every level.
# debug values are copied down-scope unless overridden.
debug: true

# you can define multiple program blocks in a config file.
# a program is just a collection of inputs (files, execs) and
# matches (patterns and reactions),
program {
  debug: false

  # file with no block. settings block is optional
  file "/var/log/messages"

  # file with a block
  file "/var/log/secure" {
    # follow means to follow a file like 'tail -F' but starts
    # reading at the beginning of the file.  A file is followed
    # through truncation, log rotation, and append.
    follow: true
  }

  # execute a command, settings block is optional
  exec "netstat -rn"

  # exec with a block
  exec "ping -c 1 www.google.com" {
    # automatically rerun the exec if it exits, as soon as it exits.
    # default is false
    restart-on-exit: false

    # minimum amount of time from one start to the next start, if we
    # are restarting. Default is no minimum
    minimum-restart-delay: 5

    # run every N seconds, but only if the process has exited.
    # default is not to rerun at all.
    run-interval: 60

    # default is to read process output only from stdout.
    # set this to true to also read from stderr.
    read-stderr: false
  }

  # Load patterns from a file.
  load-patterns: "patterns/base"


  # You can have multiple match {} blocks in your config.
  # They are applied, in order, against every line of input that
  # comes from your exec and file instances in this program block.
  match {
    # match a pattern. This can be any regexp and can include %{foo}
    # grok patterns
    pattern: "some pattern to match"

    # You can have multiple patterns here, any are valid for matching.
    pattern: "another pattern to match"

    # the default reaction is "%{@LINE}" which is the full line
    # matched.  the reaction can be a special value of 'none' which
    # means no reaction occurs, or it can be any string. The
    # reaction is emitted to the shell if it is not none.
    reaction: "%{@LINE}"

    # the default shell is 'stdout' which means reactions are
    # printed directly to standard output. Setting the shell to a
    # command string will run that command and pipe reaction data to
    # it.
    #shell: stdout
    shell: "/bin/sh"

    # flush after every write to the shell. 
    # The default is not to flush.
    flush: true

    # break-if-match means do not attempt any further matches on
    # this line.  the default is false.
    break-if-match: true
  }

  # You can also have a reaction if no match occurs throughout the entire
  # execution. This is only really valid on exec and files without follow set.
  # If you use no-match on a followed file, 'no-match' can be executed
  # every time the file is read again.
  # 
  # The same options are valid in a no-match block as in a match, except
  # for 'pattern' and 'break-if-match' which are meaningless here.
  no-match {
    reaction: "there was no match!"

    # Similar options are available in no-match as are in match blocks.
    shell: "logger -t grokgrokgrok"
  }
}
