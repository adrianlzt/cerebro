if {[istarget ia64-*-*]} {
    # Any test that uses nd_syscalls probes does not work on ia64.
    untested "$test PR6971" 
    continue
}
