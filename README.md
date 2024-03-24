# EquiFiable

[https://equifiable.com/](https://equifiable.com/).

<p align="center">
  <img src="https://github.com/equifiable/equifiable/blob/main/frontend/src/assets/logo_no_text.png"  width="300px"/>
</p>

A Tezos blockchain-based platform for easy management of tokenized Employee Stock Option Plans, improving employee retention and simplifying equity distribution.​

## Equifiable Platform Guide

To access our application, please visit equifiable.com. Here, you'll find our homepage featuring valuable information about our company and our dedicated team!

![image](https://github.com/equifiable/equifiable/assets/160471697/bcb34ebf-88f7-46a5-8851-93daf9842f1d)


To get started, look to the top right where you'll find two options: for companies and for employees, representing our two major client groups for whom we've developed this platform.

### Company Login:

Upon selecting the option for companies, you'll be directed to a page where you'll see the following screen:

![Connect to your wallet](https://github.com/equifiable/equifiable/assets/160471697/17e4b4d6-2a98-492f-add2-b55af2dfa003)

Here, you can connect to your wallet in the application template. If you don't have a wallet, simply follow the steps provided to create one. Afterward, you'll be redirected to this screen:

![Add stocks to share](https://github.com/equifiable/equifiable/assets/160471697/30d53dde-4086-42be-beeb-20bb1d2387ba)

On this page, in the case you already have a subscription, you'll input the total number of tokenized stocks you wish to share with your employees. On the contrary you should go to the section "Subscribe" In this tutorial, we'll add 200. You'll need to confirm this operation twice: once to initiate the transfer and again to authorize our company to securely manage your actions. A screen will appear with the address of your share; please ensure to copy this information for later use.

![Transfer stock options](https://github.com/equifiable/equifiable/assets/160471697/6f3f202d-9c79-4db7-9276-33ee4c556be8)

Once completed, you can proceed to transfer stock options to your employees. On the left-hand side, you'll find a menu. Let's start by selecting the section to create an ESOP, where you'll encounter this screen:

![ESOP creation](https://github.com/equifiable/equifiable/assets/160471697/123f5c87-9f55-4fe8-bc6f-0520fd0c0059)

Fill out the forms with the following details:

1. The address of the employee to whom you want to transfer shares.
2. Additional information about the transaction:
   - Stock address (copied in the first step).
   - Emission date (when you intend to transfer the ESOP to your employee).
   - Expiration date (when these stocks will expire and be no longer executable).
   - Strike price (the agreed price to exercise the option).
   - Cliff (the time before the first vesting).
   - Vesting (the duration for which this action will vest).
   - Number of shares to transfer.

After reviewing all the information on the final page and ensuring its accuracy, you may proceed. The shares will then be allocated according to the agreement you've made with your employee. Additionally, you'll have access to your dashboard, where you'll find crucial information for managing your stocks, employees, and other features.

![image](https://github.com/equifiable/equifiable/assets/160471697/b129de15-ce4e-4a53-983c-35d9e8ec514a)

Should you wish to create another stock, simply navigate to the "Create a Stock" section, and remember to note the address!

Finally, the last section pertains to subscription. To access all these features and benefit from our outstanding product, consider subscribing to our platform. 

![image](https://github.com/equifiable/equifiable/assets/160471697/b2a45a2b-97c5-460c-9cfc-723cf371a650)

Check here our price policy:

![image](https://github.com/equifiable/equifiable/assets/160471697/2e229135-f34c-4b3d-8382-8c23206ca5f3)




### Employee Login:

## Employee Login:

To proceed as an employee, visit the website [equifiable.com](https://equifiable.com) and select the employee option from the top right corner. Here, you can connect to your wallet using the application template. If you don't have a wallet yet, simply follow the provided steps to create one. Afterward, you'll be redirected to this dashboard screen:

![Employee Dashboard](https://github.com/equifiable/equifiable/assets/160471697/3b7eee0c-3b97-407a-a8cb-c32be277a0d7)

This dashboard provides all the information you need to track your stock options - those that are vesting, those already vested, and those available for purchase. This comprehensive data ensures you have all the information you need. Towards the end of the page, you can also view other stock options you have, not necessarily from the same company.

To execute a share, simply select the desired share at the bottom of the page. Your screen will then appear as follows:

![image](https://github.com/equifiable/equifiable/assets/160471697/e6667052-a9d5-4bba-9c0a-1728e10c883b)

In this scenario, you have the option to exercise more options, up to the available limit. You'll need to wait briefly to execute them, once executed your dashbord will update.

### Technical Architecture

We have three main components:

1. Smart Contracts: Control the core of the business logic. Developed in Archetype and deployed in the Tezos blockchain.
2. Frontend: React Application deployed in Firebase for the DApp interactions.
3. Backend: Application developed in Python with FastAPI and a Firebase database. Keeps an indexed version of all contracts created for easy access. Its content is for performance purposes and is verifiable through the blockchain.


### Smart Contracts

Now that you're familiar with using the platform and the technical specifications, you can understand how contracts work. Here's a simple explanation to guide you:

![image](https://github.com/equifiable/equifiable/assets/160471697/6c5c1740-9762-4c47-aa48-46318d031b97)


There are three main entities represented as contracts:

1. Factory: The smart contract that will create agreements. It is deployed only once, by the platform (EquiFiable). 
2. Agreement: Smart contract that represents each SOP Agreement. Assigned to one company and recipient. A new one is deployed every time an agreement is signed.
3. Share: Any fungible token following a minimal TZIP-7/FA1.2 standard. Deployed by the company outside the platform.
4. Subscription: A smart contract enables a company to subscribe to our platform.

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

### Test the Smart Contracts

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
octez-client transfer 0 from myself to KT1CM8wwXJxysd5gtBiqqnpWQDsQ4eHbKAqA --entrypoint "terminate"

```
5. Make a subscription

```
octez-client transfer 1.5 from myself to KT1NYURSBeB1k2ii3ErzM8E1jgQrAQEi1Khi --entrypoint "subscribe" --arg "1"

```
6. Pay a bill


```
octez-client transfer 1.5 from myself to KT1NYURSBeB1k2ii3ErzM8E1jgQrAQEi1Khi --entrypoint "payBill" --arg "Unit"

```
7. Unsubscribe

```
octez-client transfer 0 from myself to KT1NYURSBeB1k2ii3ErzM8E1jgQrAQEi1Khi --entrypoint "cancelSubscription" --arg "Unit"

```
### Our Team

![image](https://github.com/equifiable/equifiable/assets/160471697/29b8ab4c-8ecc-4bfb-b55a-41dc00525803)


### Contact

If you have any questions about the platform, our product, or anything else, please don't hesitate to contact us at equifiable@gmail.com.
