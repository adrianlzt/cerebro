Mirar tambien pandas.md

# CSV
https://docs.python.org/3/library/csv.html

with open("fichero.csv", 'r') as f:
    reader = csv.DictReader(f, delimiter=";")
    for row in reader:
        distances[(row["hostOrig"], row["hostDest"])] = float(row["distance"])


Formato de fichero.csv
hostOrig;hostDest;distance
elasticdata001;elasticdata002;1

