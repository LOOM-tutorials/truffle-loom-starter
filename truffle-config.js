// @format
const { readFileSync } = require('fs')
const path = require('path')
const { join } = require('path')
const LoomTruffleProvider  = require ('loom-truffle-provider')
const HDWalletProvider = require('truffle-hdwallet-provider')
const { sha256 } = require ('js-sha256')
const { CryptoUtils } = require ('loom-js')
const { mnemonicToSeedSync } = require ('bip39')
const fs = require('fs')
const PrivateKeyProvider = require("truffle-privatekey-provider");

function getLoomProviderWithPrivateKey (privateKeyPath, chainId, writeUrl, readUrl) {
  const privateKey = readFileSync(privateKeyPath, 'utf-8')
  return new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKey)
}

function getLoomProviderWithMnemonic (mnemonicPath, chainId, writeUrl, readUrl) {
  const mnemonic = readFileSync(mnemonicPath, 'utf-8').toString().trim()
  const seed = mnemonicToSeedSync(mnemonic)
  const privateKeyUint8ArrayFromSeed = CryptoUtils.generatePrivateKeyFromSeed(new Uint8Array(sha256.array(seed)))
  const privateKeyB64 = CryptoUtils.Uint8ArrayToB64(privateKeyUint8ArrayFromSeed)
  return new LoomTruffleProvider(chainId, writeUrl, readUrl, privateKeyB64)
}

module.exports = {
  contracts_build_directory: join(__dirname, './src/contracts'),
  compilers: {
    solc: {
      version: '0.4.24'
    }
  },
  networks: {
    extdev_plasma_us1: {
      provider: function() {
        const chainId = 'extdev-plasma-us1'
        const writeUrl = 'http://extdev-plasma-us1.dappchains.com:80/rpc'
        const readUrl = 'http://extdev-plasma-us1.dappchains.com:80/query'
        const mnemonicPath = path.join(__dirname, 'extdev_mnemonic')
        const privateKeyPath = path.join(__dirname, 'extdev_private_key')
        if (fs.existsSync(privateKeyPath)) {
          const loomTruffleProvider = getLoomProviderWithPrivateKey(privateKeyPath, chainId, writeUrl, readUrl)
          // use a dummy mnemonic to create a bunch of accounts we'll use for testing purposes
          loomTruffleProvider.createExtraAccountsFromMnemonic("gravity top burden flip student usage spell purchase hundred improve check genre", 10)
          return loomTruffleProvider
        } else if (fs.existsSync(mnemonicPath)) {
          const loomTruffleProvider = getLoomProviderWithMnemonic(mnemonicPath, chainId, writeUrl, readUrl)
          return loomTruffleProvider
        }
      },
      network_id: '9545242630824'
    },
    loom_dapp_chain: {
      provider: function () {
        const chainId = 'default'
        const writeUrl = 'http://plasma.dappchains.com/rpc'
        const readUrl = 'http://plasma.dappchains.com/query'
        const mnemonicPath = path.join(__dirname, 'mainnet_mnemonic')
        const privateKeyPath = path.join(__dirname, 'mainnet_private_key')
        if (fs.existsSync(privateKeyPath)) {
          const loomTruffleProvider = getLoomProviderWithPrivateKey(privateKeyPath, chainId, writeUrl, readUrl)
          return loomTruffleProvider
        } else if (fs.existsSync(mnemonicPath)) {
          const loomTruffleProvider = getLoomProviderWithMnemonic(mnemonicPath, chainId, writeUrl, readUrl)
          return loomTruffleProvider
        }
      },
      network_id: '*'
    }
  }
}
