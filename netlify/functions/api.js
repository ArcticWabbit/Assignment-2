const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://mmahin_db_user:test123@cluster0.gftacxt.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

exports.handler = async () => {
  try {
    await client.connect();
    const db = client.db("test");

    const users = await db.collection("users").find().toArray();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(users)
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: "Database error"
    };
  }
};