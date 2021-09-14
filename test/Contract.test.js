const { assert } = require('chai')

const Contract = artifacts.require('./Contract.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Contract', (accounts) => {
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
    it('minted successfully', async () => {
      const mint = await contract.mint('Belgium')
      const totalSupply = await contract.totalSupply()

      assert.equal(totalSupply, 1)
    })

    it('cannot mint same flag twice', async () => {
      await contract.mint('Belgium').should.be.rejected;
    })
  })
})