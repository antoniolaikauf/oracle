// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title  Tct
 * @author Antonio Laikauf
 * @notice implementazione di un oracle TC
 */

contract Tct {
    /**
     * Gmix gas minimo per il deliver
     * Gmax gas massimo per il deliver
     * Gcncl gas per la funzione cancel
     * Go gas per il cancel quando stai processando il deliver
     */

    uint256 private Counter = 0;
    uint256 public constant Gmin = 50000 wei;
    uint256 public constant Gmax = 200000 wei;
    uint256 public constant Gcncl = 10000 wei;
    uint256 public constant Go = 10000 wei;
    uint256 private Gclbk; // gaslimit per callback
    address private callback; // address a cui inviare i dati
    uint256 private f; // fee quanto è disposto a pagare l'utente
    uint256[] public deposit_f; // deposito

    /**
     * @param  params I dati che l'oracolo riceve.
     */
    struct params {
        string Url; // sito dove ottenere i dati
        string spec; // data da ottenere
        string T; // quando inviare i dati
    }

    struct data {
        params params_TC;
        uint256 Id; // id
        address callback; // dove invieare i dati
        uint256 f; // gas utente disposto a pagare
        address cu; // address contratto
    }

    event Request_Cu(uint256 id, params params_Cu);

    mapping(uint256 => data) message1;
    mapping(uint256 => bytes32) params_store;
    mapping(uint256 => bool) isCanceled;
    mapping(uint256 => bool) isDelivered;

    /**
     * @notice funzione per dare dati all'oracle (form CU)
     * @param _callback  address dove mandare i parametri
     * @param _paramUrl link url
     * @param _paramSpec il contenuto specifico (es il prezzo di un asset)
     * @param _T quando consegnarlo
     */
    function Request(
        address _callback,
        string memory _paramUrl,
        string memory _paramSpec,
        string memory _T,
        uint256 _f // uint256 _gReq // viene messa ma non viene usata nel request
    ) public {
        assert(Gmin <= _f && _f < Gmax);

        uint256 Id = Counter;
        Counter += 1;
        f = _f;
        deposit_f.push(f);
        callback = _callback;

        params memory params_data = params(_paramUrl, _paramSpec, _T);
        data memory store_data = data(params_data, Id, callback, f, msg.sender);
        message1[Id] = store_data;

        /**
         * @dev scelto di trasformare in hash i parametri essendo che dopo
         * @dev i parametri bisogna ricontrollarli nella funzione dleiver e
         * @dev quindi si confronta l'hash di questi con i parametri che
         * @dev rivece la funzione deliver
         */
        bytes32 params_hash = keccak256(abi.encode(_paramUrl, _paramSpec, _T));
        params_store[Id] = params_hash;

        emit Request_Cu(Id, params_data);
    }

    /**
     * @notice funzione  per dare dati al contratto che ha chiamato l'oracle (form Wallet enclave)
     */
    function deliver(
        uint256 _id,
        string memory _paramUrl,
        string memory _paramSpec,
        string memory _T,
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

        bytes32 params_hash = params_store[_id]; // abort if not found crearlo

        bytes32 params_hash1 = keccak256(abi.encode(_paramUrl, _paramSpec, _T));

        assert(params_hash == params_hash1 && f <= _Gdvr && !isDelivered[_id]);
        isDelivered[_id] = true;
        payable(msg.sender).transfer(f);

        Gclbk = f - Gmin;
        /**
         * @notice passaggio dei dati alla funzione del contratto che ha chiamato l'oracle
         * @dev se la callback non viene eseguita allora bisogna chiamare la call cancel
         */
        bytes4 selector = bytes4(keccak256("funzione a chi inviare  el CU"));
        (bool success, ) = callback.call{gas: Gclbk}(
            abi.encodeWithSelector(selector, _data)
        );
        require(success, "fallito");
    }
    /**
     * @notice (from CU)
     */
    function cancel(uint256 _id) public {
        data memory data_stored = message1[_id];

        bool isDelivered_cancel = isDelivered[_id];
        bool isCanceled_cancel = isCanceled[_id];

        assert(
            msg.sender == data_stored.cu &&
                data_stored.f >= Go &&
                !isCanceled_cancel &&
                !isDelivered_cancel
        );

        isCanceled[_id] = true;

        uint256 fee = data_stored.f - Go;
        /**
         * @dev si ritorna le fee sottratte con Go al contratto che ha richiesto
         * @dev i parametri e con il costo del gas di Gcnlc
         */
        assert(fee < data_stored.f && f < Go);
        (bool success, ) = msg.sender.call{value: fee, gas: Gcncl}("");

        require(success);
    }
}

// vedere il Greq nel paper
// testare in remix cosi si fa più veloce se funziona
