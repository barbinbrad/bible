class BooksTable {
    constructor(db) {
      this.database = db
    }
  
    createTable() {
      const sql = `
      CREATE TABLE IF NOT EXISTS books (
        name TEXT PRIMARY KEY NOT NULL,
        number INTEGER NOT NULL,
        slug TEXT NOT NULL)`
      return this.database.run(sql);
    }

    create(number, name, slug) {
        return this.database.run(
            'INSERT INTO books (number, name, slug) VALUES (?, ?, ?)',
            [number, name, slug]);
    }

    update(name, slug) {
        return this.database.run(
            `UPDATE books SET slug = ? WHERE name = name`
        [display, name]);
    }

    getAll(){
      return this.database.all(
        `SELECT * FROM books ORDER BY number`
      )
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