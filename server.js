const express = require("express");
const cors = require("cors");
const mailer = require("./config/mailer");
// const projects = require("./config/projects");
const fs = require("fs");
const path = require("path");
const projectsDir = path.join(__dirname, "data", "projects.json");
const localPath = __dirname + "/dist/";
const app = express();

app.use(express.static(localPath));
app.use(express.json());

var corsOptions = {
  origin: "https://www.isaacmartinez.dev",
};

app.use(cors(corsOptions));

app.post("/api/send-mail", async function (req, res) {
  try {
    const { body, subject } = req.body;
    await mailer.sendMail({
      from: "Portfolio Contact <portfolio@example.net>",
      to: "works@isaacmartinez.dev",
      subject,
      text: body,
    });
    res.status(200).json({ message: "Sent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/projects", async (_, res) => {
  const projectsJson = fs.readFileSync(projectsDir, "utf8");
  const projects = JSON.parse(projectsJson);
  res.status(200).json(projects);
});
app.post("/api/projects", async (req, res) => {
  const project = req.body;
  const projectsJson = fs.readFileSync(projectsDir, "utf8");
  const projects = JSON.parse(projectsJson);
  const newProjects = projects.push(project);
  res.status(200).json(newProjects);
});

app.get("/", (req, res) => {
  res.status(200).send("API Isaac Portfolio v0.3.2");
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}.`);
});
