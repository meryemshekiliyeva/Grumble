const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());

app.get('/api/categories', (req, res) => {
  fs.readFile('categories.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Faylı oxumaqda xəta:', err);
      return res.status(500).send('Data error');
    }
    res.json(JSON.parse(data));
  });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));