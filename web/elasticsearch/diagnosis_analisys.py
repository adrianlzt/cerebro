import re
import requests
import json
from collections import Counter

NANO_TO_SEC = 1000000000
SEC_TO_MIN = 60

def _parse_description(desc):
    indexes = re.findall("indices\[([^\]]*)\]", desc)[0].split(",")
    types = re.findall("types\[([^\]]*)\]", desc)[0]
    search_type = re.findall("search_type\[([^\]]*)\]", desc)[0]
    try:
        source = json.loads(re.findall("source(.*)", desc)[0])[0]
    except Exception:
        source = None
    return indexes, types, search_type, source



HOSTNAME = "nodo"

r = requests.get(f"http://{HOSTNAME}:9200/_tasks/?pretty&human&group_by=none&detailed")

tasks = r.json()["tasks"]

# filtrar para quedarnos solo con búsquedas
busquedas = filter(lambda x: x["action"] == "indices:data/read/search", tasks)

# filtrar quedarnos tasks grandes
min_time = NANO_TO_SEC * 7
grandes = filter(lambda x: x["running_time_in_nanos"] > min_time, busquedas)

all_index = []
all_sources = []
data = []
for task in grandes:
    indexes, types, search_type, source = _parse_description(task["description"])
    all_index.extend(indexes)
    all_sources.append(source)
    data.append({"indexes": indexes, "types": types, "search_type": search_type, "source": source})

index_agg = Counter(all_index)

for k in data:
    print("%s -> %s\n" % (indexes, json.dumps(k["source"], indent=4)))

#for k,i in index_agg.items():
#    print(k,i)
