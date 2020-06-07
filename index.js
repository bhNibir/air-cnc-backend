const express = require("express");
const app = express();
const port = process.env.PORT || 4200;
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const uniqid = require("uniqid");

//Database
const MongoClient = require("mongodb").MongoClient;
const uri = process.env.DB_PATH;
// let client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// Middleware
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hi");
});

//data query function
const searchAllData = (req, res, dbName, tableName) => {
  client = new MongoClient(uri, {
    poolSize: 10,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  client.connect(async (err) => {
    const collection = await client.db(dbName).collection(tableName);
    collection.find().toArray((err, documents) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        res.send(documents);
      }
    });
  });
  client.close();
};

app.get("/all-homes", (req, res) => {
  searchAllData(req, res, "air-cnc", "homes");
});

app.get("/all-bookings", (req, res) => {
  searchAllData(req, res, "air-cnc", "bookings");
});

app.get("/all-experiences", (req, res) => {
  searchAllData(req, res, "air-cnc", "experiences");
});

app.post("/add-home", (req, res) => {
  const items = req.body;
  client = new MongoClient(
    uri,
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  );
  client.connect((err) => {
    const collection = client.db("air-cnc").collection("homes");
    collection.insert(items, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        res.send(result.ops[0]);
      }
    });
    client.close();
  });
});

app.post("/add-booking", (req, res) => {
  const items = req.body;
  items.order_num = uniqid.time(items.user + "-#");
  client = new MongoClient(
    uri,
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  );
  client.connect((err) => {
    const collection = client.db("air-cnc").collection("bookings");
    collection.insert(items, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        res.send(result.ops[0]);
      }
    });
    client.close();
  });
});

app.post("/add-experience", (req, res) => {
  const items = req.body;
  client = new MongoClient(
    uri,
    { useNewUrlParser: true },
    { useUnifiedTopology: true }
  );
  client.connect((err) => {
    const collection = client.db("air-cnc").collection("experiences");
    collection.insert(items, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: err });
      } else {
        res.send(result.ops[0]);
      }
    });
    client.close();
  });
});

app.listen(port, () => console.log(`Listen at http://localhost:${port}`));
