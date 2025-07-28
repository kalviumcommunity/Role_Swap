const { MongoClient } = require("mongodb");
require('dotenv').config();
const uri = process.env.MONGO_URI

async function testMongoAtlasRW() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("test_rw_db");
    const collection = db.collection("test_rw_collection");

    // Write
    const insertResult = await collection.insertOne({ test: "Atlas write test" });
    console.log("Insert ID:", insertResult.insertedId);

    // Read
    const readResult = await collection.findOne({ _id: insertResult.insertedId });
    console.log("Read Result:", readResult);

    // Update
    await collection.updateOne({ _id: insertResult.insertedId }, { $set: { test: "Atlas updated test" } });

    // Delete
    await collection.deleteOne({ _id: insertResult.insertedId });

    console.log("MongoDB Atlas R/W Test ✅ Passed");
  } catch (err) {
    console.error("MongoDB Atlas R/W Test ❌ Failed", err);
  } finally {
    await client.close();
  }
}

testMongoAtlasRW();
