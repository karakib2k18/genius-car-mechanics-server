const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const objectId = require("mongodb").ObjectId;
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3zctf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
// console.log('listen to URI RAKIB', uri)
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    //   console.log('Connected to DATABASE RAKIB')
    const database = client.db("carMechanics");
    const servicesCollection = database.collection("services");

    //GET API
    app.get("/services", async (req, res) => {
      const cursor = servicesCollection.find({});
      const service = await cursor.toArray();
      res.send(service);
    });

    //GET API
    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: objectId(id) };
      const service = await servicesCollection.findOne(query);
      res.send(service);
    });

    //DELETE API
    app.delete("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: objectId(id) };
      const service = await servicesCollection.deleteOne(query);
      res.send(service);
    });

    //POST API
    app.post("/services", async (req, res) => {
      const service = req.body;
      const result = await servicesCollection.insertOne(service);
      console.log(result);
      res.send(result);
    });
  } finally {
    //   await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Running genius to the server");
});
app.get("/hello", (req, res) => {
  res.send("THIS IS FOR HELLO");
});
//DB_USER=carservice
// DB_PASS=26z8goupj6KI3bYW
app.listen(port, () => {
  console.log("listen to port genius to the server", port);
});
