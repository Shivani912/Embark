const transcriptVerification = require('Embark/contracts/transcriptVerification');
const _transcriptHash = "0x54e6289e14c7b0e7ad9acc2dfc4c1e3d027d0eef7f5c4c3fe7c292761d0e06a6"
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
    "transcriptVerification": {}
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

  it("Owner adds transcript hash", async function () {
    await transcriptVerification.methods.addTranscriptHash(accounts[2], _transcriptHash).send();
    assert(await transcriptVerification.methods.viewTranscript().call({from:accounts[2]}) === _transcriptHash)
  })

  it("Non-owner adds transcript hash", async function () {
    try {
      await transcriptVerification.methods.addTranscriptHash(
        accounts[2], _transcriptHash).send({from:accounts[1]});
      assert(false);
    } catch (error) {
      assert(error.message.includes("you are not the owner"))
    }
  })
})
