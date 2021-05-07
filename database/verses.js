class VersesTable {
    constructor(db) {
      this.database = db
    }
  
    createTable() {
      const sql = `
      CREATE TABLE IF NOT EXISTS verses (
        book TEXT NOT NULL,
        slug TEXT NOT NULL,
        chapter INTEGER NOT NULL,
        verse INTEGER NOT NULL,
        text TEXT NOT NULL,
        PRIMARY KEY(book, chapter, verse),
        FOREIGN KEY(book) REFERENCES books(name))`
      return this.database.run(sql)
    }

    create(book, slug, chapter, verse, text) {
        return this.database.run(
          `INSERT INTO verses (book, slug, chapter, verse, text)
            VALUES (?, ?, ?, ?, ?)`,
          [book, slug, chapter, verse, text])
    }

    update(book, chapter, verse, text) {
        return this.database.run(
            `UPDATE verses SET text = ? WHERE book = ? AND chapter = ? AND verse = ?`,
            [text, book, chapter, verse])
    }

    delete(book, chapter, verse){
        return this.database.run(
            `DELETE FROM verses WHERE book = ? AND chapter = ? AND verse = ?`,
            [book, chapter, verse])
    }

    clearTable(){
      return this.database.run(
          `DELETE FROM verses`,
          []
      )
  }
  }
  
  module.exports = VersesTable;