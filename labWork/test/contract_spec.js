const transcriptVerification = require('Embark/contracts/transcriptVerification');
const _transcriptHash = "0x54e6289e14c7b0e7ad9acc2dfc4c1e3d027d0eef7f5c4c3fe7c292761d0e06a6"
let accounts;
const _fakeTranscriptHash = "0x54e6289e14c7b0e7ad9acc2dfc4c1e3d027d0eef7f5c4c3fe7c292761d0e06a9"

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
  // constructor
  it("Constructor runs successfully", async function () {
    let address = await transcriptVerification.options.address;
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
  //
  it("student views transcript successfully", async function () {
    let transcript = await transcriptVerification.methods.viewTranscript().call({from:accounts[2]});
    assert.ok(transcript);
  })

  it("student's transcript does not exit", async function () {
      try{
        await transcriptVerification.methods.viewTranscript().call({from:accounts[1]});
      }
      catch(error){
        assert(error.message.includes("transcript does not exist"));
      }
    })

  it("verifier checks transcript's authenticity is correct", async function () {
    let result = await transcriptVerification.methods.isTranscriptAuthentic(accounts[2], _transcriptHash).send();
    assert.ok(result);
  })

  it("verifier checks if transcript authenticity is incorrect", async function () {
    try{
      await transcriptVerification.methods.isTranscriptAuthentic(accounts[2],_fakeTranscriptHash).send();
      assert(false);
    }
    catch(error) {
      assert(error.message.includes("Transcript not authentic"))
    }
  })
})
