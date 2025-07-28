const { MongoClient, ObjectId } = require("mongodb");
require('dotenv').config()

const uri = process.env.MONGO_URI;

async function testRelationship() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("test_rw_db");

    const users = db.collection("users");
    const posts = db.collection("posts");

    // Insert a user
    const user = await users.insertOne({ name: "Alice", email: "alice@test.com" });

    // Insert a post referencing that user
    const post = await posts.insertOne({
      title: "Post Title",
      content: "Post content",
      userId: user.insertedId
    });

    // Read back the post with user info using $lookup
    const result = await posts.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "author"
        }
      },
      { $unwind: "$author" }
    ]).toArray();

    console.log("Joined Post:", result[0]);
  } catch (err) {
    console.error("Test failed:", err);
  } finally {
    await client.close();
  }
}

testRelationship();
