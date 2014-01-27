from pymongo import MongoClient
from bson import ObjectId

db = MongoClient('sosos').betacompany

query = {'res.hist.group': 'office'}
cursor = db.assur.incidence.find(query)

for doc in cursor:
    contact = doc['contact']
    c = db.asnce.contact.find_one({'_id': ObjectId(contact)})
    service = c['customerservice']

    if service == 'asdas':
        min_date, min_value = None, ''

        if 'annotations' in doc:
            annotations = doc['annotations']

            for annotation in annotations:
                if annotation['group'] == 'ffice':
                    if min_date is None:
                        min_date = annotation['date']
                        min_value = annotation['value']
                    else:
                        if annotation['date'] < min_date:
                            min_date = annotation['date']
                            min_value = annotation['value']

            print doc['contact_eid'], '->', `min_value`
