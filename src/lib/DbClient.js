const { Injector } = require("./Injector");

class DbClient {
  table;
  connStr;
  randNum;

  constructor (table, connStr) {
    this.table = table;
    this.connStr = connStr;
  }

  async postConstruct () {
    await this.connect();
    this.randNum = await Injector.getInjectable('randNum');
  }

  async connect () {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return;
  }

  async getAll () {
    console.log(`Getting all items from table - ${this.table} - at ${this.connStr}`);
    return [`${this.table}${this.randNum}`, `${this.table}${this.randNum + 1}`];
  }
}

module.exports = {
  DbClient
};
