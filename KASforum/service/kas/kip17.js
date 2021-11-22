const ApiCaller = require("./api_caller");
const process = require("process");

class Kip17 extends ApiCaller {
  contract = "capstone"; // Contract Alias

  constructor() {
    super("https://kip17-api.klaytnapi.com");
  }

  async issueToken(address, id, uri) {
    const options = {
      method: "POST",
      url: `/v1/contract/${this.contract}/token`,
      body: {
        to: address,
        id: id,
        uri: uri,
      },
      json: true,
    };

    const res = await this.call(options);
    console.log(res);
  }
}

const kip17 = new Kip17();

module.exports = kip17;
