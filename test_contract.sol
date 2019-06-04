pragma solidity 0.5.8;

contract transcriptVerification {
    mapping(address => bytes32) transcript;
    address owner;

    constructor() public{
        owner = msg.sender;
    }
    
    modifier onlyOwner {
        require(msg.sender == owner, "you are not the owner");
        _;
    }
    
    function addtranscriptHash(address _transcriptOwner,bytes32 _transcriptHash) public onlyOwner {
        transcript[_transcriptOwner] = _transcriptHash;
    }
    
    function viewTranscript() public view returns(bytes32) {
        return transcript[msg.sender];
    }
}
