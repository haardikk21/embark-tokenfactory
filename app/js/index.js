import $ from "jquery";
import EmbarkJS from "Embark/EmbarkJS";
import Token from "Embark/contracts/Token";

let currentToken;

$(document).ready(function() {
  EmbarkJS.onReady(function(error) {
    if (error) return console.error("Error while connecting to Web3", error);

    $("#deployToken button").click(function() {
      var supply = $("#deployToken input").val();
      Token.deploy({
        arguments: [supply],
        data: Token.options.data
      })
        .send({
          gas: 500000
        })
        .then(function(deployedToken) {
          currentToken = deployedToken;
          $("#deployToken .result").append(
            "Token deployed with address: " + deployedToken.options.address
          );
        });
    });

    $("#useToken button").click(function() {
      var address = $("#useToken input").val();
      currentToken = new EmbarkJS.Contract({
        abi: Token.options.jsonInterface,
        address: address
      });
    });

    web3.eth.getAccounts(function(err, accounts) {
      $("#queryBalance input").val(accounts[0]);
    });

    $("#queryBalance button").click(function() {
      var address = $("#queryBalance input").val();
      Token.methods
        .balanceOf(address)
        .call()
        .then(function(balance) {
          $("#queryBalance .result").html(balance);
        });
    });

    $("#transfer button").click(function() {
      var address = $("#transfer .address").val();
      var num = $("#transfer .num").val();

      Token.methods
        .transfer(address, num)
        .send()
        .then(function() {
          $("#transfer .result").html("Done!");
        });
    });
  });
});
// import your contracts
// e.g if you have a contract named SimpleStorage:
//import SimpleStorage from 'Embark/contracts/SimpleStorage';
