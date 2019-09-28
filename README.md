# Before start

Remember to update

extdev_mnemonic

and 

mainnet_mnemonic

With mnemonicks of Your LOOM deployment accounts
If You do not have any You can create them at:
https://dashboard.dappchains.com/add-key

"Generate New Key"

# Truffle DappChain Example

This simple example shows how you can use `Truffle` and the [Loom Truffle Provider](https://github.com/loomnetwork/loom-truffle-provider) to build a simple Web UI that interacts with the Loom PlasmaChain.

![](https://dzwonsemrish7.cloudfront.net/items/0a1N05043p1Y1G3K1Y2L/Screen%20Recording%202018-07-17%20at%2011.26%20AM.gif?v=df873ac3)


## Requirements

Make sure the following requirements are met and then follow the steps in the next section:

```text
Recommended Node version v10.15.3
yarn or npm
```

## Install

First, let's clone this repository. Open a terminal, `cd` into the directory where you store your projects, and run the following command:

```bash
git clone https://github.com/loomnetwork/truffle-dappchain-example
```

Next, `cd` into `truffle-dappchain-example`:

```bash
cd truffle-dappchain-example
```

and run:

```bash
yarn install
```

## Run against Loom Testnet

### Deploy to extdev_plasma_us1

As an example, we will deploy and run our application against `extdev_plasma_us1`.

Run the following command:

```bash
yarn deploy:extdev
```

>The above command will **compile and then deploy** our smart contract to `extdev_plasma_us1`

### Start the web interface

The web interface is built with React and Webpack. Open a new terminal and run the following command:

```bash
yarn serve:extdev
```

> The web interface is available on http://localhost:8080.


## Useful information

1. In order to correctly redeploy the contracts, there's a command `yarn deploy:reset`.

2. Also is possible to call truffle command directly with `yarn truffle`.

2. We're not versioning the build directory for this particular example, although is recommended to versioning, the limitation can be removed by editing the `.gitignore` file.


## Current limitations

* Events declared on smart contracts should have an named parameter like `NewValueSet(uint _value)` in the contract `SimpleStore.sol`. Also, it helps in dealing with events.

Loom Network
----
[https://loomx.io](https://loomx.io)


License
----

BSD 3-Clause License
