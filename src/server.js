//Ao importar uma dependência com require, sempre será retornada uma função

//Servidor
const express = require('express')
const server = express()
const { 
    pageLanding, 
    pageStudy, 
    pageGiveClasses,
    saveClasses
} = require('./pages')

const nunjucks = require('nunjucks')

//Configurando o nunjucks(Template Engine)
nunjucks.configure('src/views', {
    express: server,
    noCache: true
})

//--------------------------------------------------------------------------------------------------------------------------------------------  
//Renderização pelo nunjucks: método render()
//Renderização pelo express: sendFile(caminho_do_arquivo_estático)
//--------------------------------------------------------------------------------------------------------------------------------------------

server //Início e configuração do servidor
    .use(express.urlencoded({extended: true})) //Recebimento dos dados vindo do corpo da requisição (request body)
    .use(express.static('public')) //Localizando todos os arquivos estáticos que estão na pasta 'public' e abrir as páginas (requisição get do HTTP) como resposta da requisição
    //Rotas da aplicação
    .get('/', pageLanding)
    .get('/study', pageStudy)
    .get('/give-classes', pageGiveClasses)
    .post('/save-classes', saveClasses)
    .listen(5500) //Inicializando o servidor na porta 5500



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

