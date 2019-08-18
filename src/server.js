const express = require("express") // import do express => server rest http
const { getSoapClient } = require("./soapService") // import modulo ./soapService para pegar o getSoapClient 

const app = express() // intanciando um express server
app.use(express.json()) // "esse server tem que "parsear" requests que vêem como json"

let client
app.post("/:method", async (req, res) => { // criei um endpoint em POST, com um path param :method
    const params = req.body // parametros que vão para o metodo wsdl
    const { method } = req.params // to pegando o :method e jogando num const

    if (!client) { // se o client não existe, entao cria ele (otimização)
        client = await getSoapClient() // Promise
    }

    // o await serve pra esperar uma "Promise", não funciona sem async
    const result = await client[method + "Async"](params) // dado o method X, e os params P, chama esse metodo no meu client
    
    // pega o resultado e joga como resposta, como codigo 200 (OK)
    res.status(200).json(result[0].return)
})

// inicie o meu server, escutando a porta 5501
app.listen(5501, () => {
    console.log("server started")
})