const caver = require("caver-js");
const ApiCaller = require("./api_caller");

class Wallet extends ApiCaller {
  constructor() {
    super("https://wallet-api.klaytnapi.com"); // endpoint setting
  }

  async CreateAccount() {
    const options = {
      method: "POST",
      url: "/v2/account",
      json: true,
    };

    return await this.call(options);
    // The final API return value(json)
    // {
    //   "address": "0xD834a0C2A46Cf9182b060F78b557e99183604e7f",
    //   "chainId": 1001,
    //   "createdAt": 1635597975,
    //   "keyId": "krn:1001:wallet:0879ec05-6c9d-4619-9fa2-3a5fc8c1b2a7:account-pool:default:0x9b2179df9564d3e265f42c6cf94d98247df217b871f9a36c1ca7ac2f60c29a32",
    //   "krn": "krn:1001:wallet:0879ec05-6c9d-4619-9fa2-3a5fc8c1b2a7:account-pool:default",
    //   "publicKey": "0x047a2ad2f030865fe26d7a52cf5100746d1b6e51ff8a4371462525a65f40d6be05adf883dcda35f337c6c49ab2ebd93d3889a0eeeebbce437e0756b46b3c21f25a",
    //   "updatedAt": 1635597975
    // }
    // -> ./controller/user.js
  }

  async sendTransfer(from, to, amount) {
    const peb = caver.utils.convertToPeb(amount, "KLAY");
    const hexpeb = caver.utils.numberToHex(peb);

    const options = {
      method: "POST",
      url: "/v2/tx/value",
      body: {
        from: from,
        value: hexpeb,
        to: to,
        submit: true,
      },
      json: true,
    };

    const res = await this.call(options);
    console.log(res);

    return res.transactionHash;
  }
}

const wallet = new Wallet();

module.exports = wallet;
