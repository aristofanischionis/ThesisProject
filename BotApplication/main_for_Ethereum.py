#!/usr/bin/python3
# my own blockcypher token to make post and delete requests is the following:
# TOKEN = 792ef7cf6a9145cf832e86618fe01c84
import requests
import json
import pprint

# # my testnet address
# botmasterAddress = '6d34d74303a17bc3ee6506a7196a85b3dd1341bb'

# #
# keyForSubliminalDecryption = ''
# # two lists one with the encoded transactions read and the other one with the decoded commands
# EncodedTransactionsList = []
# DecodedTransactionsList = []


# url = 'https://api.blockcypher.com/v1/beth/test/addrs/' + botmasterAddress
# response = requests.get(url)

# pprint.pprint(response.json())
# # response.json()
# # parsed = json.loads(response.json())
# # print(json.dumps(parsed, indent=4, sort_keys=True))

# response = requests.get('https://chain.so/api/v2/get_info/BTCTEST')
# response = requests.get('https://chain.so/api/v2/get_address_balance/DOGE/DFundmtrigzA6E25Swr2pRe4Eb79bGP8G1/500')

# if response.status_code == 200:
#     # everything went swimmingly
#     # parse the response as JSON
#     content = response.json()

#     print("address:", content['data']['address'])
#     print("Total balance:", content['data']['confirmed_balance'])
# else:
#     print("ERROR OCCURED : ", response.status_code)


