http://effbot.org/zone/stupid-exceptions-keyboardinterrupt.htm

mirar https://docs.python.org/2/library/atexit.html
mirar signal.md

Control+c:
KeyboardInterrupt



for record in database:
    begin()
    try:
        process(record)
        if changed:
            update(record)
    except (KeyboardInterrupt, SystemExit):
        rollback()
        raise
    except:
        rollback()
        # report error and proceed
    else:
        commit()
