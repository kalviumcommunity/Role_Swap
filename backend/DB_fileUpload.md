# 📂 Uploading Files to MongoDB Atlas

MongoDB Atlas does not have a direct UI to upload files like Firebase or S3, but you can still **store files** in MongoDB Atlas using Node.js by either:

- Embedding binary file data directly into documents (for small files)
- Using **GridFS** (for large files over 16MB)

---

## ✅ Option 1: Upload Small Files (<16MB) as Binary

This method stores the file content as a binary buffer inside a document.

### 📜 Script: Upload a Small File (fileUpload.js)

```js
const fs = require('fs');
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/mydb";
const client = new MongoClient(uri);

async function uploadFile() {
  await client.connect();
  const db = client.db("mydb");
  const files = db.collection("files");

  const fileBuffer = fs.readFileSync('./test.pdf');

  await files.insertOne({
    name: "test.pdf",
    uploadedAt: new Date(),
    data: fileBuffer
  });

  console.log("File uploaded to MongoDB Atlas");
  await client.close();
}

uploadFile();
```
📁 Resulting Document Format
```
{
  _id: ObjectId("..."),
  name: "test.pdf",
  uploadedAt: "2025-07-28T12:00:00Z",
  data: <Binary Buffer>
}
```

## ✅ Option 2: Upload Large Files (>=16MB) Using GridFS
GridFS breaks files into chunks and stores them across two collections:

fs.files: metadata

fs.chunks: actual binary chunks

## 📜 Script: Upload Large File Using GridFS
```
const fs = require('fs');
const { MongoClient, GridFSBucket } = require('mongodb');

const uri = "mongodb+srv://<username>:<password>@cluster0.mongodb.net/mydb";
const client = new MongoClient(uri);

async function uploadLargeFile() {
  await client.connect();
  const db = client.db("mydb");

  const bucket = new GridFSBucket(db);
  const uploadStream = bucket.openUploadStream("large-file.pdf");

  fs.createReadStream('./large-file.pdf').pipe(uploadStream)
    .on('finish', () => {
      console.log("File uploaded using GridFS");
      client.close();
    });
}

uploadLargeFile();
```

## 📥 Retrieving a File (Optional)
From Binary Document:
```
const file = await files.findOne({ name: "test.pdf" });
fs.writeFileSync('./downloaded.pdf', file.data.buffer);
```

From GridFS:
```
const downloadStream = bucket.openDownloadStreamByName("large-file.pdf");
downloadStream.pipe(fs.createWriteStream('./downloaded-large-file.pdf'));
```

## 📌 Notes
Topic	                            Details
File size limit (non-GridFS)	    Max 16MB per document
GridFS storage	                    Splits large files into 255KB chunks
Access	                            Files are not public — use API or code to read/write
Ideal use	                        Upload images, PDFs, logs, JSON, etc., for internal use

## ✅ Use Cases
Upload user profile images

Attach PDFs or receipts to orders

Store large logs or data exports

Happy uploading! 📤