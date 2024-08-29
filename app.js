require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const crypto = require("crypto");

const app = express();

const PORT = process.env.PORT || 3000;

const ASANA_ACCESS_TOKEN = process.env.ASANA_ACCESS_TOKEN;

const GITHUB_SECRET = process.env.GITHUB_SECRET;

const ASANA_PROJECT_ID = process.env.ASANA_PROJECT_ID;

app.use(bodyParser.json());

app.post("/github-webhook", (req, res) => {
  const signature = req.headers["x-hub-signature-256"];

  if (!verifyWebhook(req.body, signature)) {
    return res.status(403).send("Invalid signature");
  }

  const issue = req.body.issue;
  createAsanaTask(issue)
    .then(() => res.status(201).send("Task created in Asana"))
    .catch((err) =>
      res.status(500).send("Error creating task in Asana: " + err.message)
    );
});

function verifyWebhook(body, signature) {
  const hmac = crypto.createHmac("sha256", GITHUB_SECRET);
  const digest = `sha256=${hmac.update(JSON.stringify(body)).digest("hex")}`;

  if (signature !== digest) {
    throw new Error("Invalid webhook signature");
  }

  return true;
}

async function createAsanaTask(issue) {
  const taskData = {
    data: {
      name: issue.title,
      notes: issue.body,
      projects: [ASANA_PROJECT_ID],
      assignee: issue.login,
    },
  };

  try {
    const response = await axios.post(
      "https://app.asana.com/api/1.0/tasks",
      taskData,
      {
        headers: {
          Authorization: `Bearer ${ASANA_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Task created in Asana:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error creating task in Asana:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to create task in Asana"); // Throw error for handling
  }
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
