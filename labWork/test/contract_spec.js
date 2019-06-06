// /*global contract, config, it, assert*/

const VerifyOwner = require('Embark/contracts/VerifyOwner');

let accounts;

// For documentation please see https://embark.status.im/docs/contracts_testing.html
config({
  //deployment: {
  //  accounts: [
  //    // you can configure custom accounts with a custom balance
  //    // see https://embark.status.im/docs/contracts_testing.html#Configuring-accounts
  //  ]
  //},
  contracts: {
    "VerifyOwner": {
      
    }
  }
}, (_err, web3_accounts) => {
  accounts = web3_accounts
});

contract("VerifyOwner", function () {
  this.timeout(0);

  it("should set constructor value" , async function () {

   let result = await VerifyOwner.methods.IsOwner().call();
  
   assert.ok(result,"all okay!");
  });

it("should set constructor value" , async function () {
	try {
   let result = await VerifyOwner.methods.IsOwner().call({from: accounts[1]});
  }
   catch(err) {
	assert(err.message.includes("you are not the owner"));
}
  });
/*
  it("set storage value", async function () {
    await SimpleStorage.methods.set(150).send();
    let result = await SimpleStorage.methods.get().call();
    assert.strictEqual(parseInt(result, 10), 150);
  });

  it("should have account with balance", async function() {
    let balance = await web3.eth.getBalance(accounts[0]);
    assert.ok(parseInt(balance, 10) > 0);
*/
  });


