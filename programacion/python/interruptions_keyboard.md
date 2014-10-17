http://effbot.org/zone/stupid-exceptions-keyboardinterrupt.htm

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
