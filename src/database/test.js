//Importando o arquivo que foi exportado do db.js
const Database = require('./db')
const createProffy = require('./createProffy')

Database.then(async (db) => {
    //Inserir Dados
    proffyValue = {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=400&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4",
        whatsapp: "8998898494",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões"        
    }

    classValue = {
        subject: 1, //Química
        cost: "20"      
        //o proffy_id virá pelo banco de dados
    }

    classScheduleValues = [
        //class_id virá pelo banco de dados, após cadastrar a class
        {
            weekday: 1,
            time_from: 720,
            time_to: 1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]
    
    await createProffy(db, {proffyValue, classValue, classScheduleValues})

    //Consultar os dados inseridos    
    //Todos os proffys
    const selectedProffys = await db.all('SELECT * FROM proffys')
    // console.log(selectedProffys)
    
    //Consultar as classes de um determinado professor e trazer junto os dados do professor
    const selectedClassesAndProffys = await db.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)
    // console.log(selectedClassesAndProffys)

    //O horário que a pessoa trabalha, por exemplo, é das 8h - 18h
    const selectClassesSchedules = await db.all(`
        SELECT classes_schedule.*
        FROM classes_schedule
        WHERE classes_schedule.class_id = '1'
        AND classes_schedule.weekday = '0'
        AND classes_schedule.time_from <= '420'
        AND classes_schedule.time_to > '420'
    `)

    // console.log(selectClassesSchedules)
})