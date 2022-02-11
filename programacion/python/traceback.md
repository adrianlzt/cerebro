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



Sin tener ninguna excepción:
import traceback
tb = traceback.extract_stack()
print(tb)
