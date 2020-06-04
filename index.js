const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const cors = require('cors')
const bodyParser = require('body-parser')

// Middleware
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Hi")
})

app.get('/get-home', (req, res) => {
    res.send({name: "Alif"})
})

app.post('/add-home', (req, res) => {
    console.log(req.body)
    res.send("Get Data")
})

app.listen(port , ()=> console.log(`Listen at http://localhost:${port}`))