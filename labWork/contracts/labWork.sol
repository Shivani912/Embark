pragma solidity ^0.5.0;

contract VerifyOwner {
    
    address owner;

    constructor() public{
        owner = msg.sender;
    }
    
    modifier onlyOwner {
        require(msg.sender == owner, "you are not the owner");
        _;
    }
    
    function IsOwner() public view onlyOwner returns(bool){
         return true;
     }
}
