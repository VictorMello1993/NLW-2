//Ao importar uma dependência com require, sempre será retornada uma função


//Servidor
const express = require('express')
const server = express()

const nunjucks = require('nunjucks')

//Configurando o nunjucks(Template Engine)
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

const title = 'Hello World'

//Dados
const proffys = [
    {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=400&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4",
        whatsapp: "8998898494",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões",
        subject: "Química",
        cost: "20",
        weekday: [0],
        time_from: [720],
        time_to: [1220]
    },
    {
        name: "Daniele Evangelista",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=400&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4",
        whatsapp: "8998898494",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões",
        subject: "Química",
        cost: "20",
        weekday: [1],
        time_from: [720],
        time_to: [1220]
    },
    {
        name: "Mayke Brito",
        avatar: "https://avatars2.githubusercontent.com/u/6643122?s=400&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4",
        whatsapp: "8998898494",
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões",
        subject: "Química",
        cost: "20",
        weekday: [1],
        time_from: [720],
        time_to: [1220]
    }
]

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

//--------------------------------------------------------------------------------------------------------------------------------------------  
//Renderização pelo nunjucks: método render()
//Renderização pelo express: sendFile(caminho_do_arquivo_estático)
//--------------------------------------------------------------------------------------------------------------------------------------------

//Funcionalidades
function getSubject(subjectNumber){
    const position = +subjectNumber - 1
    return subjects[position]
}

function pageLanding(req, res) {
    return res.render('index.html')
}

function pageStudy(req, res) {
    const filters = req.query //Capturando dos dados da URL (na verdade são os parâmetros da URL), vindo do navegador, para o back-end
    return res.render('study.html', { proffys, filters, subjects, weekdays })
}

function pageGiveClasses(req, res) {
    const data = req.query //Capturando dos dados da URL (na verdade são os parâmetros da URL), vindo do navegador, para o back-end

    //Adicionando dados do formulário à lista de proffys
    const isEmpty = Object.keys(data).length == 0
    if (!isEmpty) {
        data.subject = getSubject(data.subject)
        proffys.push(data)        
        return res.redirect('/study') //Redirecionando para a página study.html com os dados adicionados do formulário
    }
    return res.render('give-classes.html', { subjects, weekdays }) //Se não houve preenchimento dos dados do formulário, apenas mostrar a mesma página
}


server //Início e configuração do servidor
    .use(express.static('public')). //Localizando todos os arquivos estáticos que estão na pasta 'public' e abrir as páginas (requisição get do HTTP) como resposta da requisição
    //Rotas da aplicação
    get('/', pageLanding).
    get('/study', pageStudy).
    get('/give-classes', pageGiveClasses).
    listen(5500) //Inicializando o servidor na porta 5500



//ATENÇÃO! A cada nova requisão é preciso reiniciar o servidor

/*nodemon é o plugin que monitora as conexões do servidor,
em vez de ficar ligando e desligando manualmente com CTRL + C
no terminal*/

/*OBS: é recomendado utilizar nodemon em ambiente de desenvolvimento.
Em ambiente de produção não será mais necessária a sua utilização*/


/*Arquivos estáticos:
    *Scripts js do front-end
    *Arquivos css
    *Arquivos HTML
    *Imagens
*/

