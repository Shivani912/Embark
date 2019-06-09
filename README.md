# Embark Assignment

All the code in this branch is a part of my assignment for George Brown College. 

It consists of a smart contract (transcriptVerification.sol) under the labWork/contracts folder and test code (contract_spec.js) under the labWork/test folder.

# Design Pattern:

The smart contract implements two design patterns as discussed in the class.

    1. Verification pattern : 
        Address verification and data verification is implemented using modifiers. Address verification checks the owner and data verification checks the transcript hash.
        
    2. Off-chain Data Storage Pattern: 
        Since transcripts cannot be stored on-chain due to the storage problem, actual transcripts are stored off-chain in database and only the transcript hashes are stored on-chain. Therefore to verify a transcript, you have to hash the transcript file that is in database and compare its authenticity with its hash that is on-chain.

# Smart Contract:

The contract consists of three functions:
    
    1. addTranscriptHash
    2. isTranscriptAuthentic
    3. viewTranscript
    
This is a simpler version of the contract code I have under my Transcrypt repository. For more information on what the contract does, please go to: https://github.com/Shivani912/Transcrypt/blob/master/README.md

 
## 1. addTranscriptHash: 

  Lets the owner of the contract add transcript hashes that are mapped to the transcript owner i.e. student's address.

  Parameters: 
    
    1. address: to whom the transcript belongs to
    2. bytes32: hash of the transcript
    
  Constraints:
  
    1. onlyOwner: Only the owner of the contract can add a transcript hash.
    

 ## 2. isTranscriptAuthentic:

  This function is targeted to the verifiers. They can pass in the student's address and transcript hash to check if it matches to the address=>hash mapping stored on the contract. If the hash has been altered with, the function will revert. If the values match, it returns true.
  
  Parameters:
    
    1. address: to whom the transcript belongs to
    2. bytes32: hash of the transcript
    
  Returns:
    
    1. bool: Returns true when the transcript is authentic.
    
  Constraints:
  
    1. onlyAuthentic: The modifier checks if the transcript hash for the given address matches with the one that is stored in the mapping.
    
## 3. viewTranscript:
    
  This function is targetted to students, who can view their own transcripts.
  Note: The student must access this function from their own address. If there is no transcript associated with that address, the function reverts.

  No parameters.
    
  Returns: 
    
    1. bytes32: Hash of the transcript of the address who called the function
    

# Test:

There are total of 7 tests for the above smart contract. 

  1. Constructor runs successfully
  2. Owner adds transcript hash
  3. Non-owner adds transcript hash
  4. student views transcript successfully
  5. student's transcript does not exit
  6. verifier checks transcript's authenticity is correct
  7. verifier checks if transcript authenticity is incorrect
  
There is one test case to check if the constructor successfully adds owner's address and there are two test cases for each function in the smart contract. Each of the functions are tested for their positive and negative behaviour.  

## Note: Embark has a bug. 

When you use the 'embark test' command, all the tests work properly. But, when you use the '--coverage' parameter with it, for some reason, it is not able to access the viewTranscript function and thus, makes the related tests fail with only 77% of code coverage. 

## References:

1. Off-chain data storage pattern: https://www.researchgate.net/publication/325439030_A_Pattern_Collection_for_Blockchain-based_Applications
2. Embark documentation: https://embark.status.im/docs/overview.html
