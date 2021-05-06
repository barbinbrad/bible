class BooksTable {
    constructor(db) {
      this.database = db
    }
  
    createTable() {
      const sql = `
      CREATE TABLE IF NOT EXISTS books (
        name TEXT PRIMARY KEY NOT NULL,
        display TEXT NOT NULL)`
      return this.database.run(sql);
    }

    create(name, display) {
        return this.database.run(
            'INSERT INTO books (name, display) VALUES (?, ?)',
            [name, display]);
    }

    update(name, display) {
        return this.database.run(
            `UPDATE books SET display = ? WHERE name = name`
        [display, name]);
    }

    delete(name){
        return this.database.run(
            `DELETE FROM books WHERE name = ?`,
            [name]);
    }

    clearTable(){
        return this.database.run(
            `DELETE FROM books`,
            []
        )
    }
  }
  
  module.exports = BooksTable;