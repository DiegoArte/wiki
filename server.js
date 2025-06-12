const express = require('express');
const multer = require('multer');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Configurar almacenamiento para archivos subidos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Inicializar base de datos SQLite
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS registros (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    equipo TEXT,
    sprint INTEGER,
    tipo TEXT,
    comentarios TEXT,
    archivoName TEXT,
    archivoPath TEXT
  )`);
});

app.use(express.json());
app.use(express.static(__dirname));

// Endpoint para manejar el envío del formulario
app.post('/api/registros', upload.single('archivo'), (req, res) => {
  console.log('Datos recibidos:', req.body);
  const { equipo, sprint, tipo, comentarios } = req.body;
  const archivoName = req.file.originalname;
  const archivoPath = req.file.path;

  db.run(`INSERT INTO registros (equipo, sprint, tipo, comentarios, archivoName, archivoPath) VALUES (?, ?, ?, ?, ?, ?)`,
    [equipo, sprint, tipo, comentarios, archivoName, archivoPath],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      console.log('Registro guardado con ID:', this.lastID);
      res.json({ id: this.lastID });
    }
  );
});

// Endpoint para recuperar todos los registros
app.get('/api/registros', (req, res) => {
  db.all(`SELECT * FROM registros`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
