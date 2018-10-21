import $ from "jquery";
import EmbarkJS from "Embark/EmbarkJS";
import Token from "Embark/contracts/Token";

$(document).ready(function() {
  EmbarkJS.onReady(function(error) {
    if (error) return console.error("Error while connecting to Web3", error);
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
