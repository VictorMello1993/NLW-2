const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

function getSubjects(subjectNumber){
    const position = +subjectNumber - 1
    return subjects[position]
}

function convertHoursToMinutes(time){
    //Desestruturação
    const [hour, minutes] =  time.split(':')

    // -----------------------------------------------------------------------------------------------------------------------------
    //Isso é equivalente a
    // const hour =  time.split(':')[0]
    // const minute = time.split(':')[1]
    // -----------------------------------------------------------------------------------------------------------------------------

    return Number((hour * 60) + minutes)
}

module.exports = {
    subjects, weekdays, getSubjects, convertHoursToMinutes
}