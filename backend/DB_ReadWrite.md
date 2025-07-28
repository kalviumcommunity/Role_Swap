# MongoDB Atlas Read/Write (R/W) Test

This guide helps you test basic read and write operations on your **MongoDB Atlas** database using **Node.js**.

---

## ✅ Prerequisites

- Node.js v14 or higher (recommended: v18+)
- A MongoDB Atlas cluster
- IP whitelisted in Atlas (`0.0.0.0/0` for testing is fine but not safe for prod)
- `mongodb` npm package installed

---

## 🔗 MongoDB Atlas Connection URI

Replace this with your actual URI from the Atlas dashboard:

mongodb+srv://<username>:<password>@cluster0.xyz.mongodb.net/test_rw_db?retryWrites=true&w=majority

csharp
Copy
Edit

> ⚠️ Make sure to URL-encode any special characters in the password (e.g., `@` → `%40`).

---

## 📜 Test Script (mongoTest.js)

```js
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://<username>:<password>@cluster0.xyz.mongodb.net/test_rw_db?retryWrites=true&w=majority";

async function testMongoAtlasRW() {
  const client = new MongoClient(uri, {
    tls: true,
    serverApi: { version: '1' }
  });

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
```

## 🚀 Run the Script
```
node mongoTest.js
```

## ✅ Expected Output
```
Insert ID: 66abc123456789
Read Result: { _id: ObjectId("..."), test: 'Atlas write test' }
MongoDB Atlas R/W Test ✅ Passed
```

## 🧹 Clean Up
If needed, delete the collection from Atlas UI or using:
```
db.test_rw_collection.drop()
```