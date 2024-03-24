import os
import json
import requests
from typing import List


def get_agreements(contract_factory: str) -> List[str]:
    # TODO: verify if the address is valid

    """
    Returns a json with the agreements.

    Returns:
        agreements: A json with the agreements.

    """
    # Return a reference to the root of the database
    req = requests.get(os.getenv('TKTZ_API_URL') + "v1/contracts?creator=" + contract_factory)

    if not req.ok:
        raise ConnectionError('Could not connect to the TKTZ API')

    response = req.json()

    addresses = []
    for r in response:

        address = r['address']

        if not isinstance(address, str):
            raise ValueError('Address is not a string')
        
        addresses.append(address)

    return addresses

def get_agreement_details(agreement: str) -> dict:
    # TODO: verify if the address is valid

    """
    Returns a dict with the agreement details.

    Returns:
        agreements: A dict with the agreement details.

    """
    # Return a reference to the root of the database
    req = requests.get(os.getenv('TKTZ_API_URL') + 'v1/contracts/' + agreement + '/storage')

    if not req.ok:
        raise ConnectionError('Could not connect to the TKTZ API')

    response = req.json()

    return response

def get_share(agreement: str) -> str:
    # TODO: verify if the address is valid

    """
    Returns a json with the agreements.

    Returns:
        agreements: A json with the agreements.

    """
    # Return a reference to the root of the database
    req = requests.get(os.getenv('TKTZ_API_URL') + 'v1/contracts/' + agreement + '/storage')

    if not req.ok:
        raise ConnectionError('Could not connect to the TKTZ API')

    response = req.json()
    
    share = response['share_address']

    return share

def get_ledger_ptr(share: str) -> str:
    # TODO: verify if the address is valid

    """
    Returns a json with the agreements.

    Returns:
        agreements: A json with the agreements.

    """
    # Return a reference to the root of the database
    req = requests.get(os.getenv('TKTZ_API_URL') + 'v1/bigmaps?contract=' + share + '&path=ledger')

    if not req.ok:
        raise ConnectionError('Could not connect to the TKTZ API')

    response = req.json()

    if len(response) != 1:
        raise ValueError('Invalid number of ledgers')

    ptr = response[0]['ptr']

    return str(ptr)

def get_ledger_values(ledger: str) -> dict:
    # TODO: verify if the address is valid

    """
    Returns a json with the agreements.

    Returns:
        ledger_values: A dictionary with keys [tokens, allowances].
    """
    # Return a reference to the root of the database
    req = requests.get(os.getenv('TKTZ_API_URL') + 'v1/bigmaps/keys?bigmap=' + ledger)

    if not req.ok:
        raise ConnectionError('Could not connect to the TKTZ API')

    response = req.json()

    ledger_values = []
    for r in response:
        ledger_values.append(r['value'])

    return ledger_values

