//Importando os objetos de bancos de dados, que estão em db.js
const Database = require('./database/db')

//Importando os objetos que estão no format.js (subjects, weekdays e getSubjects)
const { subjects, weekdays, getSubjects, convertHoursToMinutes } = require('./utils/format')

function pageLanding(req, res) {
    return res.render('index.html')
}

async function pageStudy(req, res) {
    const filters = req.query //Capturando dos dados da URL (na verdade são os parâmetros da URL), vindo do navegador, para o back-end

    //Se não tiver nenhum fitro de matéria, dia e horário preenchido no formulário, renderizar a mesma página study.html
    if (!filters.subject || !filters.weekday || !filters.time) {
        return res.render('study.html', { filters, subjects, weekdays })
    }

    //Conversão de horas em minutos (o banco irá armazenar os valores time_from e time_to em minutos)
    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE EXISTS(
            SELECT classes_schedule.*
            FROM classes_schedule
            WHERE classes_schedule.class_id = classes.id
            AND classes_schedule.weekday = ${filters.weekday}
            AND classes_schedule.time_from <= ${timeToMinutes}
            AND classes_schedule.time_to > ${timeToMinutes}
        ) 
        AND classes.subject = '${filters.subject}'       
        `

    //Caso haja erro na hora da consulta do banco de dados
    try {
        const db = await Database
        const proffys = await db.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubjects(proffy.subject)
        })
        
        /*Se toda a execução do banco de dados concluir com êxito, renderizar a página study com todos os dados de proffys 
        preenchidos*/
        return res.render('study.html', { proffys, subjects, filters, weekdays })

    } catch (error) {
        console.log(error)
    }
}

function pageGiveClasses(req, res) {
    return res.render('give-classes.html', { subjects, weekdays }) //Se não houve preenchimento dos dados do formulário, apenas mostrar a mesma página
}

async function saveClasses(req, res) {
    const createProffy = require('./database/createProffy')

    const proffyValue = {
        name: req.body.name,
        avatar: req.body.avatar,
        whatsapp: req.body.whatsapp,
        bio: req.body.bio
    }

    const classValue = {
        subject: req.body.subject,
        cost: req.body.cost
    }

    const classScheduleValues = req.body.weekday.map(
        (weekday, index) => {
            return {
                weekday,
                time_from: convertHoursToMinutes(req.body.time_from[index]),
                time_to: convertHoursToMinutes(req.body.time_to[index])
            }
        })


    try {
        const db = await Database

        await createProffy(db, { proffyValue, classValue, classScheduleValues })        

        let queryString = '?subject=' + req.body.subject
        queryString += '&weekday=' + req.body.weekday[0]
        queryString += '&time=' + req.body.time_from[0]

        return res.redirect('/study' + queryString)
    } catch (error) {
        console.log(error)
    }

    // const data = req.query //Capturando dos dados da URL (na verdade são os parâmetros da URL), vindo do navegador, para o back-end

    // //Adicionando dados do formulário à lista de proffys
    // const isEmpty = Object.keys(data).length == 0
    // if (!isEmpty) {
    //     data.subject = getSubject(data.subject)
    //     proffys.push(data)        
    //     return res.redirect('/study') //Redirecionando para a página study.html com os dados adicionados do formulário
    // }
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}