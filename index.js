const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

//Database
const MongoClient = require('mongodb').MongoClient;
const uri =  process.env.DB_PATH
let client = new MongoClient(uri, { useNewUrlParser: true });

// Middleware
app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Hi")
})

app.get('/all-homes', (req, res) =>  {

        client = new MongoClient(uri, { useNewUrlParser: true });
        client.connect(err => {
        const collection = client.db("air-cnc").collection("homes");
        collection.find().toArray((err, documents) => {
            if(err){
                console.log(err);
                res.status(500).send({message:err})
                
            }
            else{
                res.send(documents)
            }
        })
        client.close();
        });
    })

app.get('/all-bookings', (req, res) =>  {

    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("air-cnc").collection("bookings");
    collection.find().toArray((err, documents) => {
        if(err){
            console.log(err);
            res.status(500).send({message:err})
            
        }
        else{
            res.send(documents)
        }
    })
    client.close();
    });
})


app.post('/add-home', (req, res) => {
    const items = req.body

    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("air-cnc").collection("homes");
    collection.insert(items, (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({message:err})
            
        }
        else{
            res.send(result.ops[0])
        }
    })
    client.close();
    });
})


app.post('/add-booking', (req, res) => {
    const items = req.body

    client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
    const collection = client.db("air-cnc").collection("bookings");
    collection.insert(items, (err, result) => {
        if(err){
            console.log(err);
            res.status(500).send({message:err})
            
        }
        else{
            res.send(result.ops[0])
        }
    })
    client.close();
    });
})

app.listen(port , ()=> console.log(`Listen at http://localhost:${port}`))




