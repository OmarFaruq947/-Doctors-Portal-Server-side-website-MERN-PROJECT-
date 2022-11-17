const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

//  middleware
app.use(cors());
app.use(express.json());

// database code
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.x54pawi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    //connection
    await client.connect();
    const servicesCollection = client
      .db("doctors-portal-db")
      .collection("doctors-portal-one");

    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = servicesCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    //POST
    app.post("/booking", async (req, res) => {
      const newBooking = req.body;
      const result = await servicesCollection.insertOne(newBooking);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("running my doctors portal server server");
});

app.listen(port, () => {
  console.log(`Running Server on port', ${port} `);
});
