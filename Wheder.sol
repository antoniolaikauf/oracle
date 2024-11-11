// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Wheder {
    string private Wheder_city;
    address private immutable i_owner;

    modifier only_owner() {
        require(msg.sender == i_owner);
        _;
    }

    constructor() {
        i_owner = msg.sender;
    }

    function upgrade_wheder(string memory _wheder) public only_owner {
        Wheder_city = _wheder;
    }

    function get_wheder() public view returns (string memory) {
        return Wheder_city;
    }
}
