# EquiFiable

## Summary

There are three main entities represented as contracts:

1. Factory: The smart contract that will create agreements. It is deployed only once, by the platform (EquiFiable). 
2. Agreement: Smart contract that represents each SOP Agreement. Assigned to one company and recipient. A new one is deployed every time an agreement is signed.
3. Share: Any fungible token following a minimal TZIP-7/FA1.2 standard. Deployed by the company outside the platform.
4. Signature: Support contract 

## Contracts

### Setup the environment

```
cd contracts
make build-docker
make run-docker
```

To initialize the octez client, add a `.env` file with the following format.
 
```
PRIVATE_KEY=
CONTACT1_KEY=
CONTACT2_KEY=
MYSELF_KEY=
```

Then, each time you initialize the container, run `make init` to setup the client.

### Deploy the Smart Contract

Inside the initialized docker, run

```
make init
completium-cli deploy src/factory.arl --as myself --parameters '{"owner": "%COMPANY_ADDRESS%", "price": "1tz"}'
```

### Test the Smart Contract

1. You need a tokenized share and give an allowance for the Factory, that you can create as 

```
completium-cli deploy src/share.arl --as myself --parameters '{"initial_holder": "%COMPANY_ADDRESS%", "total_supply": "10000", "metadata_coin": ""}'

octez-client transfer 0 from myself to %SHARE_ADDRESS% --entrypoint "approve" --arg "Pair \"%FACTORY_ADDRESS%\" 6000" --burn-cap 0.1
```

2. Create an agreement from the company to an employee

```
octez-client transfer 1 from myself to %FACTORY_ADDRESS% --entrypoint "create" --arg "Pair \"%SHARE_ADDRESS%\" (Pair \"%EMPLOYEE_ADDRESS%\" (Pair \"%COMPANY_ADDRESS%\" (Pair 2019720900 (Pair 2 (Pair { Pair 1704101700 5 ; Pair 1706780100 6 ; Pair 1709285700 7 ; Pair 1711960500 10 } 90)))))" --burn-cap 0.9

```

3. See the available balance

```
octez-client run view "getBalances" on contract "%AGREEMENT_ADDRESS%"
```

4. Terminate the contract

```

```

octez-client transfer 0 from myself to KT1CM8wwXJxysd5gtBiqqnpWQDsQ4eHbKAqA --entrypoint "terminate" 
