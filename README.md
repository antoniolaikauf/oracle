# Creazione di un oracle

### Cosa sono?

gli oracle sono utilizzati per connettere la **blockchain** ai sistemi esterni e quindi ottenere data che sono **off-chain** essendo che una caratteristica che manca alle blockchain è quella di ottenere dati dall'esterno essendo che le **blockchain non fanno parte del mondo reale** quindi se degli smart-contract devono fare decisioni in base ad eventi che sono nel mondo reale bisogna portare le informazioni nella blockchain.
quindi gli oracle sono ponti che servono per collegare i due mondi: quello **off-chain** e quello **on-chain**

ci sono diversi tipi di oracle:

1. **input oracle**: questi ottengono dati off-chain e li passano alla rete blockchain
2. **output oracle**: questi permettono di triggherare eventi che sono off-chain
3. **Cross-chain oracles**: permettono l'interazione tra blockchain differenti
4. **Compute-enabled oracles**: permettono di eseguire calcoli complessi off-chain, questi stanno diventando popolari essendo che sono un alternativa rispetto alle spese che si avrebbe facendo questi calcoli on-chain

### Problemi

ci sono due problemi riguardante gli oracle

1. come si fa a capire che i dati che otteniamo dalla blockchain sono accurati
2. non abbiamo nessuna garanzia che gli oracle rimaranno online e funzionati tutto il tempo
3. se un oracle è centralizzato vuol dire che **il nodo ha il controllo su quel smart contract**

un modo per mitigare questi problemi sarebbe di creare un **oracle decentralizzato**, ottenendo fonti da diverse risorse. ma questo non toglie i problemi riduce solo la loro probabilità di accadere

è come sulle macchine, puoi renderle sicure quanto vuoi ma il rischio rimane

### Processo

l'oracle una volta che ha ottenuto i suoi dati li deve rendere compatibili alla blockchain, deve fare lo stesso lavoro che fa il compiler nel trasformare il codice in bit cosi che la macchina riesca a capire.
In questa fase l'oracle potrebbe fare processi come **filtraggio**, **aggregazioen**, **validazione** dei dati per renderli sicuri e accurati, fa lo stesso lavoro dei dati che servono per allenare un modello di AI.
durante il processo di validazione l'oracle usa tecniche di **crittografia** cosi che i dati durante il transito non vengono modificati [**tampering**](<https://en.wikipedia.org/wiki/Tampering_(crime)>).
Per trasmettere dati all'interno della blockchain lo si fa attraverso una transazione speciale, questa transazione come le altre viene validata dai nodi.
Una volta che i dati sono all'interno della blockchain gli smart-contract possono interagire con essi ES. uno smart-contract potrebbe rilasciare i fondi una volta che il prezzo di un azione raggiunge un certo livello

# Decentralized Oracle Networks (DONs)

L'obbiettivo principale di questi oracle è di superare le limitazioni dei oracle centralizzati, ilquale possono essere punti vulnerabili all'interno della blockchain. Gli oracle centralizzati potrebbero portare il richio di portare dati manipolati essendo l'unica risorsa dei dati i DONs **ottengono dati da varie fonti indipendenti** cosi da migliorare l'affidabilità.

### Processo

questi sono composti da vari nodi che ottengono dati dal mondo reale e si accordano prima di inviarli dentro alla blockchain, questo processo assicura che anche se ci sono delle discrepanze tra i dati questi vengono filtrati migliorando la **sicurezza e la fiducia**, **l'accuratezza dei dati**, **resistenza alla manipolazione**, **migliorando l'affidabilità**

uno dei racle più usati è [**Chainlink**](https://chain.link/) e [**Bandprotocol**](https://www.bandprotocol.com/)

Chainlink utilizza un modello decntralizzato che raccoglie dati e li verifica, invece Bandprotocol prioritizza l'efficienza e velocità riducendo il time e le risorse computazionali richieste per processare dati e validarli, inoltre Chainlink lavora con più nodi rispetto a Bandprotocol questo può aumentare la sicurezza dei dati ma diminuisce la latenza (velocità di risposta di un sistema) invece Bandprotocol utilizza meno nodi diminuendo la latenza ma aumentando la centralizzazione

# Dipendenze

## Installazione [node](https://nodejs.org/en/?ref=Mazik-documentation)

## Installazione metemask con fondi all'interno

per ottenere i dondi ci sono due opzioni:
se lo vuoi deploiare su una rete test vai [Alchemy](https://dashboard.alchemy.com/) e [Chainlink](https://dev.chain.link/)

se lo vuoi deploiare su una rete mainnet devi usare i tuoi fondi

## Download progetto

```markdown
git clone https://github.com/antoniolaikauf/oracle.git

cd oracle
```

## Download solc (compilatore per smart contract)

```markdown
npm i solc@^0.8.0
```

## Download axios

```markdown
npm install axios
```

## Download ethers

```markdown
npm install --save ethers
```

## Creazione del file .env

```markdown
API_URL='rete'
PRIVATE_KEY='private key del portafoglio stare attenti a meterlo nel env perchè potrebbe non essere sicuro al 100%'

esecuzione nel terminale

set -a
source .env
set +a
```

## Esecuzione

```markdown
node compile.js

node deploy.js
```

alla fine dovresti avere l'address con cui si può interagire

## opzioni

volendo si può cambiare la rete su cui fare il deploy del contratto cambiando nel API_URL.

Creare account a [alchemy](https://dashboard.alchemy.com/) e vedere tutte le reti
