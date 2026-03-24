const fs = require("fs");
const path = require("path");

exports.handler = async () => {
  try {
    const filePath = path.join(process.cwd(), "public", "db.json");
    const data = fs.readFileSync(filePath, "utf-8");

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: data
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};