const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

// uri
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@clustercrud.ctitxen.mongodb.net/?retryWrites=true&w=majority&appName=clusterCrud`;

// mongo client
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Middlewares
app.use(cors());
app.use(express.json());

// mongo collections
const categoryCollection = client.db("bookVerse").collection("categories");

async function run() {
  try {
    await client.connect();

    app.get("/", (req, res) => {
      res.send("Welcome to Book Verse server");
    });

    app.get("/categories", async (req, res) => {
      const cursor = categoryCollection.find();
      const categories = await cursor.toArray();
      res.send(categories);
    });

    app.listen(port, (req, res) => {
      console.log("Server is running on port", port);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB! and running the express server on port",
      port
    );
  } finally {
  }
}
run().catch(console.dir);
