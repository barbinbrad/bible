class BooksTable {
    constructor(db) {
      this.database = db
    }
  
    createTable() {
      const sql = `
      CREATE TABLE IF NOT EXISTS books (
        name TEXT PRIMARY KEY NOT NULL,
        link TEXT NOT NULL)`
      return this.database.run(sql)
    }

    create(name, link) {
        return this.database.run(
            'INSERT INTO books (name, link) VALUES (?, ?)',
            [name, link])
    }

    update(name, link) {
        return this.database.run(
            `UPDATE books SET link = ? WHERE name = name`
        [link, name])
    }

    delete(name){
        return this.database.run(
            `DELETE books WHERE name = ?`,
            [name])
    }
  }
  
  module.exports = BooksTable;