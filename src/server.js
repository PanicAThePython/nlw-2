const proffys = [
    {
        name: "Diego Fernandes",
        avatar:"https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "47998567432",
        bio:"Entusiasta das melhores tecnologias de química avançada. Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject: "Química",
        cost: "20",
        weekday:[0],
        time_from:[720],
        time_to: [1220]
    },
    {
        name: "Mayk Brito",
        avatar:"https://avatars2.githubusercontent.com/u/6643122?s=460&u=1e9e1f04b76fb5374e6a041f5e41dce83f3b5d92&v=4",
        whatsapp: "47998568876",
        bio:"Adoro motivar as pessoas",
        subject: "Educação Física",
        cost: "20",
        weekday:[1],
        time_from:[720],
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
    "Química"
]


const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado"
]

function getSubject(subjectNumber){
    const arrayPosition = +subjectNumber - 1
    return subjects[arrayPosition]
}

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

server.use(express.static("public"))//configurar arquivos static
.get("/", (req, res) =>{
    return res.render("index.html") //render-->renderiza uma página
})
.get("/study", (req, res) =>{
    const filters = req.query
    return res.render("study.html", {proffys, filters, subjects, weekdays})
})
.get("/give-classes", (req, res) =>{
    const data = req.query
    const isNotEmpty = Object.keys(data).length > 0 //vai transformar as chaves num array(lista), tá comparando se o tamanho é zero
                                                  //se não for zero, isNotEmpty terá true
    if (isNotEmpty) {
        //transforma o número na matéria correspondente
        data.subject = getSubject(data.subject)

        //adiciona os dados se existir
        proffys.push(data)
        return res.redirect("/study")
    }

    //se não tiver dados, mostrar formulário
    return res.render("give-classes.html", {subjects, weekdays})
}).listen(5500)