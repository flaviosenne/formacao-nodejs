const express = require('express')
const MercadoPago = require('mercadopago')

const app = express()

MercadoPago.configure({
    // serve para dizer se está em desenvolvimento ou produção
    // true quer dizer que está em desenvolvimento
    sandBox: true,
    access_token: 'TEST-Token'
})

app.get('/', (req, res) => {
    res.send('ppa')
})

app.get('/pagar',  async (req, res) => {
    const id = String(Date.now())
    const email = 'joaodev3@gmail.com'

    var dados = {
        items: [
            item = {
                id: id,
                title: 'bone, relogio',
                quantity: 1,
                currency_id: 'BRL',
                unit_price: parseFloat(50)
            }
        ],
        payer: {
            email: email
        },
        external_reference: id
    }

    try{
        var pagamento = await MercadoPago.preferences.create(dados)
    console.log(pagamento)
    return res.redirect(pagamento.body.init_point)
    }
    catch(err){
        return res.send(err.message)
    }
    
})

app.listen(3000, console.log('server'))
