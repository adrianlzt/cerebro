import traceback

try:
    raise ValueError
except:
    tb = traceback.format_exc()
else:
    tb = "No error"
finally:
    print tb


otra forma:
logger.exception(ex)
