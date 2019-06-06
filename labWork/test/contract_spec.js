
const transcriptVerification = require('Embark/contracts/transcriptVerification');

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
    "transcriptVerification": { }
  }
}, (_err, web3_accounts) => {
  accounts = web3_accounts
});

contract("transcriptVerification", function () {
  this.timeout(0);

  it("Constructor runs successfully", async function () {
    let address = transcriptVerification.options.address;
    assert.ok(address);
  })
})
