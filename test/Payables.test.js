const Web3 = require("web3");
const { assert } = require("chai");
const abi = require("../src/abis/Contract.json");
require("chai").use(require("chai-as-promised")).should();

const web3 = new Web3("http://localhost:7545");

let account;

const init = async (contractAddress) => {
  const id = await web3.eth.net.getId();
  const contract = new web3.eth.Contract(abi.abi, abi.networks[id].address);

  await web3.eth.getAccounts().then((e) => (account = e[0]));
  const bal = await web3.eth.getBalance(account);

  async function getTotalSupply() {
    const supply = await contract.methods.totalSupply().call();
    console.log("TotalSupply = " + supply + " flag(s)");
  }

  async function ownerOf(tokenId) {
    const res = await contract.methods.ownerOf(tokenId).call();
    console.log(`Token with id of ${tokenId} is owned by ${res}`);
  }

  async function createFlag(address, data) {
    const res = await contract.methods
      .createFlag(address, data)
      .send({ from: account, gas: 4712388, gasPrice: 100000000000 });

    console.log("Flag minted to " + address);
  }

  async function setFlagForSale(tokenId, tokenPrice) {
    const res = await contract.methods.setForSale(tokenId, tokenPrice).send({
      from: account,
      gas: 4712388,
      gasPrice: 100000000000,
    });

    console.log("Flag with id of " + tokenId + " is now listed for sale");
  }

  async function buyFlag(tokenId, value) {
    const res = await contract.methods.buyFlag(tokenId).send({
      from: account,
      gas: 4712388,
      gasPrice: 100000000000,
      value: value,
    });

    console.log("Flag successfully bought", res);
  }

  async function transferFlag(from, to, tokenId) {
    await contract.methods
      .transferFlag(from, to, tokenId)
      .send({ from: account, gas: 4712388, gasPrice: 100000000000 });

    console.log("Flag transferred to " + to);
  }

  async function getPriceFlag(tokenId) {
    const res = await contract.methods.getPriceFlag(tokenId).call();
    console.log(
      "Price of flag with id is " + web3.utils.fromWei(res, "ether") + " Ether"
    );
  }

  async function getPastEvents() {
    const res = await contract.getPastEvents();
    console.log(res);
  }

  // await createFlag(account, "FNT");
  await getTotalSupply();
  // await setFlagForSale(1, 1000);
  // await ownerOf(1);
  // getPastEvents();
  // await buyFlag(1, 1000);
  // await ownerOf(1);
  // await transferFlag(account, "0xA68FeCC8971a9218558ddb798218F79442Dd44cE", 1);
  // await getPriceFlag(13);
};

init();
