const { assert } = require('chai')

const Contract = artifacts.require('./Contract.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Flagnation', (accounts) => {
  let contract

  before(async () => {
    contract = await Contract.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = contract.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await contract.name()
      assert.equal(name, 'Flagnation')
    })

    it('has a symbol', async () => {
      const symbol = await contract.symbol()
      assert.equal(symbol, 'FNT')
    })

  })

  

  describe('minting', async () => {
    it('first mint', async () => {
      const mint = await contract.createFlag('0xA1f6ffB4146aAD74752B80eeDA9A7620fb5D4940', 'https://ipfs.io')
      const totalSupply = await contract.totalSupply()

      assert.equal(mint.receipt.status, true || 'true')
    })

    it('second mint', async () => {
      const mint = await contract.createFlag('0xA1f6ffB4146aAD74752B80eeDA9A7620fb5D4940', 'https://ipfs.io')
      const totalSupply = await contract.totalSupply()

      assert.equal(mint.receipt.status, true || 'true')
    })
  })

  describe('balanceOf', async () => {
    it('check balance of adress', async () => {
      let balance = await contract.balanceOf('0xA1f6ffB4146aAD74752B80eeDA9A7620fb5D4940')
      assert.equal(balance.toString(), '2')
    })
  })

  describe('ownerOf', async () => {
    it('check owner of token', async () => {
      let balance = await contract.ownerOf(1)
      assert.equal(balance.toString(), '0xA1f6ffB4146aAD74752B80eeDA9A7620fb5D4940')
    })
  })

  describe('getTokenURI', async () => {
    it('check uri of token', async () => {
      let uri = await contract.tokenURI(1)
      assert.equal(uri, 'https://ipfs.io')
    })
  })
})