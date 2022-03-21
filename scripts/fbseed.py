import firebase_admin

import os

import json

from firebase_admin import credentials, firestore

cred = credentials.Certificate("secrets/angular-fire-e40b7-firebase-adminsdk-qrqzf-ceb75c456c.json")

firebase_admin.initialize_app(cred)

db = firestore.client()

for filename in os.listdir('data'):

    if filename.endswith('.json'):

        collectionName = filename.split('.')[0] # filename minus ext will be used as collection name

        f = open('data/' + filename, 'r', encoding='utf8')

        docs = json.loads(f.read())

        for doc in docs:

            id = doc.pop('id', None)

            if id:

                db.collection(collectionName).document(id).set(doc, merge=True)

            else:

                db.collection(collectionName).add(doc)
