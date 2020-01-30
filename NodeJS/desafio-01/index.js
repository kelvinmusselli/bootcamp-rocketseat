const express = require("express");
const cors = require("cors");

const server = express();

server.use(express.json());
server.use(cors());

var reqCount = 1;
var autoIncrementId = 1;

// middleware global
server.use((req, res, next) => {
  console.log(` O Metodo ${req.method} foi executado; URL:${req.url}`);
  console.log(` Quantidade de requisições feitas = ${reqCount++}`);
  next();
});

/**
 * Middleware que checa se o projeto existe
 */
const checkProjectExists = (req, res, next) => {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: "Project not found" });
  }

  return next();
};

const projects = [
  // {
  //   id: 0,
  //   title: "Novo projeto",
  //   tasks: ["Nova tarefa"]
  // }
];

//get all projects
server.get("/projects", (req, res) => {
  return res.status(200).json({ success: "Listando usuários", data: projects });
});
//create project
server.post("/projects", (req, res) => {
  var { id, title } = req.body;
  id = autoIncrementId++;

  const project = {
    id,
    title,
    tasks: []
  };

  projects.push(project);
  return res.status(201).json({ success: "Cadastrado!", data: project });
});

//UPDATE PROJECT BY ID
server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.status(200).json({ success: "Atualizado!", data: project });
});

// DELETE PROJECT BY ID
server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const { id } = req.params;

  const projectIndex = projects.findIndex(p => p.id == id);

  projects.splice(projectIndex, 1);

  return res.status(200).json({ success: "Projeto removido!", data: projects });
});

server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);
});
//porta do servidor
server.listen(3003);
