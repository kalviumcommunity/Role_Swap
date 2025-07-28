const fs = require('fs');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function uploadFile() {
  await client.connect();
  const db = client.db("test_rw_db");
  const files = db.collection("files");

  const fileBuffer = fs.readFileSync('./empty.pdf');

  await files.insertOne({
    name: "test.pdf",
    uploadedAt: new Date(),
    data: fileBuffer
  });

  console.log("File uploaded to MongoDB Atlas");
  await client.close();
}

uploadFile();
