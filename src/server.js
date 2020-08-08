const {pageLanding, pageStudy, pageGiveClasses, saveClasses} = require('./pages')

//template engine nunjucks dá poderes ao html
const express = require('express')
const server = express()
const nunjucks = require('nunjucks')

//configurar nunjucks
//1 passo: mostro onde estão meus arquivos html
//2 passo: mostro qual meu express(servidor), se quero guardar memoria cache(facilita, deixa mais rápido) ou nao
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server
//receber os dados do req.body --> para esconder os dados, eles não aparecem na url
.use(express.urlencoded({ extended: true }))
//configurar arquivos static
.use(express.static("public"))
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
.listen(5500)