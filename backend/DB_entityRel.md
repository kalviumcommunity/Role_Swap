# 🧪 MongoDB Atlas: Entity Relationship Test (Users & Posts)

This guide walks through a simple test script that simulates a **relationship between two entities** — `users` and `posts` — using **referencing** and `$lookup` in MongoDB Atlas.

---

## ✅ Goal

Create a relationship where:
- A `post` references a `user` using `userId`
- Then perform a **join** using MongoDB's `$lookup` to get the post along with user info

---

## 📁 Collections Used

- `users`: stores user data
- `posts`: stores posts, each with a `userId` referencing the `users` collection

---

## 🔗 Relationship Type: Referencing

A `post` contains a `userId` that points to a user in the `users` collection, simulating a one-to-many relationship (one user → many posts).

---

## 📜 Script: `entityRel.js`

```js
const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb+srv://<username>:<password>@cluster0.xyz.mongodb.net/test_rw_db?retryWrites=true&w=majority";

async function testRelationship() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("test_rw_db");

    const users = db.collection("users");
    const posts = db.collection("posts");

    // Step 1: Insert a sample user
    const user = await users.insertOne({ name: "Alice", email: "alice@test.com" });

    // Step 2: Insert a post referencing the user
    const post = await posts.insertOne({
      title: "Post Title",
      content: "Post content",
      userId: user.insertedId
    });

    // Step 3: Perform a $lookup to fetch the post with user info
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
```

## 🔍 What Each Step Does
Step	                              Description
✅ Connect to MongoDB Atlas	      - Uses MongoClient to connect to your cluster
✅ Insert a user	                  - Adds a test user to the users collection
✅ Insert a post	                  - Adds a post with a reference to the inserted user's _id
✅ $lookup	                      - Performs a JOIN from posts to users using userId
✅ Print result	                  - Logs the post with full author data embedded

## 🖨️ Output Example

```
{
  _id: "66b...",
  title: "Post Title",
  content: "Post content",
  userId: "64a...",
  author: {
    _id: "64a...",
    name: "Alice",
    email: "alice@test.com"
  }
}
```

## 🛠 Notes
This is a test-only script, so it uses hardcoded inserts.

'$lookup' in MongoDB is the equivalent of SQL JOIN.

This works best for one-to-many relationships like user → posts.

## 🧼 Cleanup (Optional)
To remove test data:

```
await db.collection("posts").deleteMany({});
await db.collection("users").deleteMany({});
```

## 📌 When to Use Referencing
Use referencing instead of embedding when:
- Documents grow large
- Entities are reused (e.g., the same user across many posts)
- You want to maintain normalized structure
