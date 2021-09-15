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

  

  describe('minting function', async () => {
    it('first mint', async () => {
      const mint = await contract.createFlag('0x3c0898974de2472ef405882851a89568254e0364', 'https://some.json.document')
      const totalSupply = await contract.totalSupply()

      assert.equal(mint.receipt.status, true || 'true')
    })

    it('second mint', async () => {
      const mint = await contract.createFlag('0x3c0898974de2472ef405882851a89568254e0364', 'https://some.json.document')
      const totalSupply = await contract.totalSupply()

      
      assert.equal(mint.receipt.status, true || 'true')
    })
  })

  describe('burning function', async () => {
    it('burn first token', async () => {
      const burn = await contract.burnFlag(1)
      const totalSupply = await contract.totalSupply()

      assert.equal(totalSupply.toString(), '1')
    })
  })

  describe('openzeppelin defaults', async () => {
    it('check balance of adress', async () => {
      let balance = await contract.balanceOf('0x3c0898974de2472ef405882851a89568254e0364')
      assert.equal(balance.toString(), '1')
    })

    it('check owner of token', async () => {
      await contract.ownerOf(2)
    })

    it('check uri of token', async () => {
      let uri = await contract.tokenURI(2)
      assert.equal(uri, 'https://some.json.document')
    })
  })

  describe('burnFlag function', async () => {
  })
})