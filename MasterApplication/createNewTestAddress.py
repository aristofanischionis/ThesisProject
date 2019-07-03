#!/usr/bin/python3
# my own blockcypher token to make post and delete requests is the following:
# TOKEN = 792ef7cf6a9145cf832e86618fe01c84

import requests
import json
import pprint

def createAddress():
    params = (
        ('token', '792ef7cf6a9145cf832e86618fe01c84'),
    )

    response = requests.post('https://api.blockcypher.com/v1/beth/test/addrs', params=params)

    pprint.pprint(response.json())
    

# response I got

# {'address': '6d34d74303a17bc3ee6506a7196a85b3dd1341bb',
# 'private': 'cc451cd29ca1b75997b997960cc86c8e6e7c7d211c7cb2bb7e3e499e9da0730a',
# 'public': '049d77b66ffec11cbac15e20b08640eb1bdbbdd0efbe104c76137a269181d42cded551fb52baf46dabc3d854e90acb5f4ddd481ab1cf6b170642767be160c06c85'}