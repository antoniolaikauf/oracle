// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Tct {
    uint256 private Counter = 0;
    uint256 public constant Gmin = 50000 wei; // gas min deliver
    uint256 public constant Gmax = 200000 wei; // gas max deliver
    uint256 public constant Gcncl = 10000 wei; // gas cancel
    uint256 public constant Go = 10000 wei; //  Gas needed for Deliver on a canceled request
    uint256 private Gclbk; // gaslimit per callback
    address private callback;
    uint256 private f;
    address private immutable i_address_Owner;

    struct params {
        string Url; // sito dove ottenere i dati
        string spec; // data da ottenere
        uint256 T; // quando inviare i dati
    }

    struct data {
        params params_TC;
        uint256 Id; // id
        address callback; // dove invieare i dati
        uint256 f; // gas utente disposto a pagare
        address cu; // address contratto
    }

    mapping(address => data) message1;
    mapping(uint256 => bytes32) params_store;
    mapping(uint256 => bool) isCanceled;
    mapping(uint256 => bool) isDelivered;

    constructor() {
        i_address_Owner = msg.sender;
    }

    function Request(
        address _callback,
        string memory _paramUrl,
        string memory _paramSpec,
        uint256 _T,
        uint256 _f,
        uint256 _gReq // viene messa ma non viene usata nel request
    ) public {
        assert(Gmin <= _f && _f < Gmax);
        uint256 Id = Counter;
        Counter += 1;
        f = _f;
        callback = _callback;
        params memory params_data = params(_paramUrl, _paramSpec, _T);

        data memory store_data = data(params_data, Id, callback, f, msg.sender);

        bytes32 params_hash = keccak256(abi.encode(_paramUrl, _paramSpec, _T));

        params_store[Id] = params_hash;
        message1[msg.sender] = store_data;
    }

    function deliver(
        uint256 _id,
        string memory _paramUrl,
        string memory _paramSpec,
        uint256 _T,
        string memory _data,
        uint256 _Gdvr // viene scelto dal enclave e sarebbe il gas per il deliver
    ) public {
        if (isCanceled[_id] && !isDelivered[_id]) {
            isDelivered[_id] = true;
            /*
             inviati al wallet che è stato cretao dall'enclave toff crea wallet
            */
            payable(msg.sender).transfer(Go);
            return;
        }

        bytes32 params_hash = params_store[_id]; // da bloccare se non trovati

        params memory params1 = params(_paramUrl, _paramSpec, _T);

        bytes32 params_hash1 = keccak256(abi.encode(_paramUrl, _paramSpec, _T));

        assert(params_hash == params_hash1 && f <= _Gdvr && !isDelivered[_id]);
        isDelivered[_id] = true;
        payable(msg.sender).transfer(f);
        Gclbk = f - Gmin;

        callback.call{gas:Gclbk}(abi.);// invio dati a callback
    }

    function cancel() public {}
}
