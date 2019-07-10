#!/usr/bin/python3
import requests
import json
import pprint


def generateTRXhex():
    

def pushTransaction(botmasterAddress):
    print("I am about to push a transaction to the bitcoin testnet")
    transactionhex = generateTRXhex()
    data = {
        'tx_hex': transactionhex
    }

    response = requests.post('https://chain.so/api/v2/send_tx/BTCTEST', data=data)
