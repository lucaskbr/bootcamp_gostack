const express = require('express');

const app = express();

app.use(express.json());

let requistion = 0;
const projects = [];

app.use(function(req, res, next) {
  requistion++;
  next();
  console.log(requistion);
});

function checkId(req, res, next) {
  const project = projects[req.params.id];

  if (!project) {
    return res.status(400).json({ error: 'O id não existe' });
  }

  req.id = req.params.id;
  req.project = project;

  return next();
}

app.get('/projects', (req, res) => {
  return res.json(projects);
});

app.get('/projects/:id', checkId, (req, res) => {
  return res.json(req.project);
});

app.post('/projects', (req, res) => {
  const { id, title, tasks } = req.body;
  const newProject = { id, title, tasks };
  projects.push(newProject);
  return res.json(projects);
});

app.post('/projects/:id/tasks', checkId, (req, res) => {
  const { title } = req.body;
  projects[req.id].tasks.push(title);
  return res.json(projects);
});

app.put('/projects/:id', checkId, (req, res) => {
  const { title } = req.body;
  projects[req.id].title = title;
  return res.json(projects);
});

app.delete('/projects/:id', checkId, (req, res) => {
  projects.splice(req.id);
  return res.send();
});

app.listen(3300);
