const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let users = [];

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  const userExists = users.find(u => u.username === username);
  if (userExists) {
    return res.status(400).send('İstifadəçi artıq mövcuddur');
  }

  users.push({ username, password });
  return res.send('Uğurla qeydiyyatdan keçdiniz!');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);
  if (!user) {
    return res.status(401).send('Yanlış istifadəçi adı və ya şifrə');
  }

  return res.send('Uğurlu giriş!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});