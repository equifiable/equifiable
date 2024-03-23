import os
from datetime import datetime
from sys import argv
import json
import base64
import firebase_admin
from firebase_admin import db
from firebase_admin.db import Reference
from firebase_admin.exceptions import InvalidArgumentError
from firebase_admin.exceptions import FirebaseError
from firebase_admin import firestore
from fastapi import status, HTTPException
from dotenv import load_dotenv

from tktz_api import *
from management import DatabaseManagement
from database import *

load_dotenv()
connect_to_database()

client = get_database()
factory_addr = os.getenv('CONTRACT_FACTORY_ADDRESS')
        
factories = DatabaseManagement(table_name='Factories',
                        class_name_id='factory_id')

agreements = DatabaseManagement(table_name='Agreements',
                        class_name_id='agreement_id')

shares = DatabaseManagement(table_name='Shares',
                        class_name_id='shares_id')

agreements = get_agreements(factory_addr)

# client.child('Factories').child(factory_addr).set({'agreements': agreement})

for single_agreement in agreements:
    agreement_details = get_agreement_details(single_agreement)
    recipient = agreement_details['recipient']
    company = agreement_details['company_address']
    share = agreement_details['share_address']

    _ptr = get_ledger_ptr(share)

    ledger_values = get_ledger_values(_ptr)
    ledger_dict = {'ledger': ledger_values}

    
    client.child('Recipients').child(recipient).child('agreements').child(single_agreement).set(agreement_details | ledger_dict)
    client.child('Companies').child(company).child('agreements').child(single_agreement).set(agreement_details | ledger_dict)

    client.child('Shares').child(share).child('infos').set({'ledger': ledger_values})

