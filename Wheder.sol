// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Wheder {
    string public Wheder_city;

    function upgrade_wheder(string memory _wheder) public {
        Wheder_city = _wheder;
    }

    function get_wheder() public view returns (string memory) {
        return Wheder_city;

        
    }
}
