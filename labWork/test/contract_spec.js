
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
  // constructor
  it("Constructor runs successfully", async function () {
    let address = await transcriptVerification.options.address;
    assert.ok(address);
  })
  //
  it("views transcript successfully", async function () {
    let transcript = await transcriptVerification.methods.viewTranscript().call({from:accounts[2]});
    assert.ok(transcript);
  })

  // it("no transcript", async function () {
  //   try{
  //     await transcriptVerification.methods.viewTranscript().call({from:accounts[1]});
  //   }
  //   catch(err){
  //     assert.equal(err.message,"transcript does not exist");
  //   }
  // })
})
