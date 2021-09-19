const { assert } = require("chai");

const Contract = artifacts.require("./Contract.sol");

require("chai").use(require("chai-as-promised")).should();

contract("Flagnation", (accounts) => {
  let contract;

  before(async () => {
    contract = await Contract.deployed();
  });

  describe("deployment", async () => {
    it("deploys successfully", async () => {
      const address = contract.address;
      assert.notEqual(address, 0x0);
      assert.notEqual(address, "");
      assert.notEqual(address, null);
      assert.notEqual(address, undefined);
    });

    it("has a name", async () => {
      const name = await contract.name();
      assert.equal(name, "Flagnation");
    });

    it("has a symbol", async () => {
      const symbol = await contract.symbol();
      assert.equal(symbol, "FNT");
    });
  });

  describe("minting function", async () => {
    it("first mint", async () => {
      const mint = await contract.createFlag(
        "0x7d3Cb8dFFB9E33A98FC6e7e39b0e7d83a4CC6D22",
        "https://some.json.document"
      );
      const totalSupply = await contract.totalSupply();

      assert.equal(mint.receipt.status, true || "true");
    });
  });

  describe("setOwner function", async () => {
    it("sets new owner correctly", async () => {
      const adress = "0xA68FeCC8971a9218558ddb798218F79442Dd44cE";
      await contract.setOwner(adress);
      let res = await contract.getOwner();

      assert.equal(res.toString(), adress);
    });
  });

  describe("openzeppelin defaults", async () => {
    it("check balance of adress", async () => {
      let balance = await contract.balanceOf(
        "0x7d3Cb8dFFB9E33A98FC6e7e39b0e7d83a4CC6D22"
      );
      assert.equal(balance.toString(), "1");
    });

    it("check owner of token", async () => {
      await contract.ownerOf(1);
    });

    it("check uri of token", async () => {
      let uri = await contract.tokenURI(1);
      assert.equal(uri, "https://some.json.document");
    });
  });
});
