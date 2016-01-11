def merge_dicts(a, b):
   for key in b:
       if key in a:
           if isinstance(a[key], dict) and isinstance(b[key], dict):
               merge_dicts(a[key], b[key])
           elif isinstance(a[key], list) and isinstance(b[key], list):
               del(a[key])
           elif isinstance(a[key], list) and not isinstance(b[key], list):
               a[key].append(b[key])
           elif not isinstance(a[key], list) and not isinstance(b[key], list):
               a[key]=[a[key],b[key]]
           else:
               raise Exception("Unsupported. a[key]: %s. b[key]: %s" % (type(a[key]), type(b[key])))
       else:
           if isinstance(b[key], dict):
               a[key] = {}
               merge_dicts(a[key], b[key])
           elif isinstance(b[key], list):
               continue
           elif isinstance(b[key], int) or isinstance(b[key], float) or isinstance(b[key], str):
               a[key] = [b[key]]
           else:
               raise Exception("Unsupported. b[key]: %s" % type(b[key]))

