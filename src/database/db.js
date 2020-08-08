const Database = require('sqlite-async')
Database.open(__dirname + '/database.sqlite').then(execute)    

function execute(db){

    //Criação das tabelas do banco de dados
    return db.exec(`
        CREATE TABLE IF NOT EXISTS proffys (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            avatar TEXT,
            whatsapp TEXT,
            bio TEXT
        );

        CREATE TABLE IF NOT EXISTS classes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            subject INTEGER,
            cost TEXT,
            proffy_id INTEGER
        );

        CREATE TABLE IF NOT EXISTS classes_schedule(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            class_id INTEGER,
            weekday INTEGER,
            time_from INTEGER,
            time_to INTEGER
        );
    `)
}

/*Exportando o módulo (arquivo que representa um objeto JS) a ser utilizado em outros módulos após concluir a criação das tabelas, ou seja,
  o módulo que importar este, será passado o db daqui já com a estrutura das tabelas criadas*/
module.exports = Database.open(__dirname + '/database.sqlite').then(execute)

