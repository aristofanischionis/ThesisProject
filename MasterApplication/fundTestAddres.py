#!/usr/bin/python3
# my own blockcypher token to make post and delete requests is the following:
# TOKEN = 792ef7cf6a9145cf832e86618fe01c84

import requests
import json
import pprint

# let's fund the test address

def sendFunds(botmasterAddress):

    params = (
        ('token', '$792ef7cf6a9145cf832e86618fe01c84'),
    )

    data = '{"address": "' + botmasterAddress + \
        '", "amount": 1000000000000000000}'

    response = requests.post(
        'https://api.blockcypher.com/v1/beth/test/faucet', params=params, data=data)
    
    pprint.pprint(response.json())

    # getting balance of the address
    req = 'https://api.blockcypher.com/v1/beth/test/addrs/' + botmasterAddress
    response = requests.get(req)
    print("My test account is : ")
    pprint.pprint(response.json())


