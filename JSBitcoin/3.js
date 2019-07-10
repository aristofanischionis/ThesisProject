// Create and send a Testnet3 Bitcoin transaction:
//
// 1. Query for unspent outputs.
// 2. Create a transaction.
// 3. Forward the transaction to the Testnet3 Bitcoin network.
//
// Note:
// To explore the Testnet3 Bitcoin blockchain, see:
// https://live.blockcypher.com/btc-testnet/
//
// More information about the Blockcypher.com API, see: http://dev.blockcypher.com/
//
// More information:
// Example 3b
// https://www.mobilefish.com/developer/nodejs/nodejs_quickguide_bitcoinjs.html
//
// Disclaimer:
//
// Use this script at your own risk! All information on this page is provided "as is", without any warranty.
// Mobilefish.com will not be liable for any damages, loss of profits or any other kind of loss
// you may sustain by using this script.

var bitcoin = require('bitcoinjs-lib'); // Use version 2.2.0
var request = require('request');
var prompt = require('cli-prompt');

// Convert 'satoshi' to bitcoin value
var satoshiToBTC = function(value) {
	return value * 0.00000001;
};

// Broadcasts a transaction to the network via blockcypher.com
var broadcast_tx = function(tx) {

	console.log("tx in hex = ", tx.toHex());

	var options = {
		uri: 'https://api.blockcypher.com/v1/btc/test3/txs/push',
		method: 'POST',
		json: {
			"tx": tx.toHex()
		}
	};

	request(options, function(err, httpResponse, body) {
		if (err) {
			console.error('Request failed:', err);
		} else {
			console.log('Broadcast results:', body);
			console.log("Transaction send with hash:", tx.getId());
		}
	});
}


// Fee to pay the miners in sathosis
var tx_fee = 10000; // 0.0001 BTC

// Prompt for the private key of the source address
prompt('Enter the private key of the source address (WIF format): ', function (private_wif) {
	// Get the source Testnet3 Bitcoin address from the private key
	var network = bitcoin.networks.testnet;
	var keyPair = bitcoin.ECPair.fromWIF(private_wif, network);
	var source_address = keyPair.getAddress()

	// Query blockcypher.com for the unspent outputs from the source address
	var url = "https://api.blockcypher.com/v1/btc/test3/addrs/"+source_address+"?unspentOnly=true";

	request(url, function (error, response, body) {
		if (!error && response.statusCode == 200) {

			// Parse the response and get the first unspent output
			var json = JSON.parse(body);
			var unspent = json["txrefs"][0];

			console.log("JSON unspent", unspent);

			// Prompt for the destination address
			console.log("Found an unspent transaction output with ", satoshiToBTC(unspent.value), " BTC.");

			prompt('Enter a destination address: ', function(dest_address) {
				// Calculate the withdraw amount minus the tx fee
				var withdraw_amount = unspent.value - tx_fee;

				console.log("Unspent value (BTC)= ", satoshiToBTC(unspent.value));
				console.log("Tx fee (BTC)= ", satoshiToBTC(tx_fee));
				console.log("Withdraw amount (BTC)= ", satoshiToBTC(withdraw_amount));

				// Build a transaction
				console.log("TransactionBuilder input tx_hash = ", unspent.tx_hash);
				console.log("TransactionBuilder input tx_output_n = ", unspent.tx_output_n);

				var txb = new bitcoin.TransactionBuilder(network);
				txb.addInput(unspent.tx_hash, unspent.tx_output_n);
				txb.addOutput(dest_address, withdraw_amount);

				txb.sign(0, keyPair);
				var tx = txb.build();

				console.log("tx = ", tx);

				// Prompt to confirm sending the transaction
				var confirm = "Send " + satoshiToBTC(withdraw_amount) + " plus miner fee? (y/N):";
				prompt(confirm, function(result) {
					if (result.toUpperCase() == "Y") {
						broadcast_tx(tx);
					};
				});

			});
		} else {
			console.log("Unable to find any unspent transaction outputs.");
			if (error) console.log("ERROR:", error);
		}
	});
});