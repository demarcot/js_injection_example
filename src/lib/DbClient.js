class DbClient {
  table;
  connStr;

  constructor (table, connStr) {
    this.table = table;
    this.connStr = connStr;
  }

  async connect () {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return;
  }

  async getAll () {
    console.log(`Getting all items from table - ${this.table} - at ${this.connStr}`);
    return [`${this.table}1`, `${this.table}2`];
  }
}

module.exports = {
  DbClient
};
