const fs = require("fs");
const path = require("path");

exports.handler = async function () {
  try {
    const filePath = path.resolve(__dirname, "../../public/db.json");
    const data = fs.readFileSync(filePath, "utf-8");

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: data
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to load data" })
    };
  }
};