pragma solidity ^0.5.0;

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

    modifier onlyAuthentic(address _transcriptOwner, bytes32 _transcriptHash) {
        require(transcript[_transcriptOwner] == _transcriptHash, "Transcript not authentic");
        _;
    }

    function addTranscriptHash(address _transcriptOwner,bytes32 _transcriptHash) public onlyOwner {
        transcript[_transcriptOwner] = _transcriptHash;
    }

    function viewTranscript() public view returns(bytes32) {
        require(transcript[msg.sender] != bytes32(0), "transcript does not exist");
        return transcript[msg.sender];
    }

    function isTranscriptAuthentic(address _transcriptOwner, bytes32 _transcriptHash) public view onlyAuthentic(_transcriptOwner,_transcriptHash) returns(bool) {
        return true;
    }
}