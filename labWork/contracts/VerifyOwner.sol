pragma solidity ^0.5.0;

contract VerifyOwner {
    address owner;
    
    constructor() public {
        owner = msg.sender;
    }
    
    function AmIOwner() view public returns(bool){
        if(owner == msg.sender) {
            return true;
        }
        else{
            return false;
        }
    }
}
