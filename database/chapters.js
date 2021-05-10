class ChaptersTable {
    constructor(db) {
      this.database = db
    }
  
    createTable() {
      const sql = `
      CREATE TABLE IF NOT EXISTS chapters (
        name TEXT NOT NULL,
        number INTEGER NOT NULL,
        next TEXT,
        previous TEXT,
        PRIMARY KEY(name, number),
        FOREIGN KEY(name) REFERENCES books(name))`
      return this.database.run(sql);
    }

    create(name, number, next, previous) {
        return this.database.run(
            'INSERT INTO chapters (name, number, next, previous) VALUES (?, ?, ?, ?)',
            [name, number, next, previous]);
    }

    update(name, number, next, previous){
        return this.database.run(
            `UPDATE chapters SET next = ?, previous = ? WHERE name = ? AND number = ? `,
            [next, previous, name, number]
        )
    }

    get(name, number){
      return this.database.get(
        `SELECT * FROM chapters WHERE name = ? AND number = ?`,
        [name, number]
      )
    }

    getAll(){
      return this.database.all(
        `SELECT chapters.name, chapters.number, chapters.next, chapters.previous FROM chapters INNER JOIN books ON books.name = chapters.name ORDER BY books.number, chapters.number`
      )
    }

    delete(name, number){
        return this.database.run(
            `DELETE FROM chapters WHERE name = ? AND number = ?`,
            [name, number]);
    }

    clearTable(){
        return this.database.run(
            `DELETE FROM chapters`,
            []
        )
    }
  }
  
  module.exports = ChaptersTable;