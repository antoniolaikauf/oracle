// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Tct {
    uint256 private Counter = 0;
    uint256 public constant Gmin = 50000 wei; // gas min deliver
    uint256 public constant Gmax = 200000 wei; // gas max deliver
    uint256 public constant Gcncl = 10000 wei; // gas cancel
    uint256 public constant Go = 10000 wei; //  Gas needed for Deliver on a canceled request

    struct data {
        string Url; // sito dove ottenere i dati
        string spec; // data da ottenere
        uint256 T; // quando inviare i dati
        uint256 Id; // id
        address callback; //
        uint256 f;
    }

    // data[] private params;
    mapping(address => data) check_params;
    function Request(
        address _callback,
        string memory _paramsUrl,
        string memory _paramsSpec,
        uint256 _T,
        uint256 _f,
        uint256 _gReq
    ) public {
        uint256 Id = Counter;
        Counter += 1;
        data memory Params = data(
            _paramsUrl,
            _paramsSpec,
            _T,
            Id,
            _callback,
            _f
        );
        check_params[msg.sender] = Params;
    }
}
