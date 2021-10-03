const express = require('express')
const path = require('path')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const server = express()
const port = process.env.PORT || 5000

server.use(express.json())
server.use(express.urlencoded({
  extended: true
}))

if (process.env.NODE_ENV === 'production') {
  server.use(enforce.HTTPS({ trustProtoHeader: true }));
  server.use(express.static(path.join(__dirname, 'client/build')))

  server.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  })
}

server.listen(port, (error) => {
  if (error) throw error
  console.log(`Server running on port ${port}`)
})

server.post('/payment', (req, res) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd'
  }

  stripe.charges.create(body, (stripeError, stripeResponse) => {
    if (stripeError) {
      res.status(500).send({ error: stripeError })
    } else {
      res.status(200).send({ success: stripeResponse })
    }
  })
})