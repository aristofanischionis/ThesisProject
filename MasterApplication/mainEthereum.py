#!/usr/bin/python3
# my own blockcypher token to make post and delete requests is the following:
# TOKEN = 792ef7cf6a9145cf832e86618fe01c84

import requests
import json
import pprint

from createNewTestAddress import *
from fundTestAddres import *
from pushTRXs import *


botmasterAddress = '6d34d74303a17bc3ee6506a7196a85b3dd1341bb'

# sendFunds(botmasterAddress)
pushTransaction(botmasterAddress)