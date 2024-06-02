const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(express.json()); // Para parsear JSON en el cuerpo de las peticiones
app.use(cors()); // Habilita CORS para todas las rutas y orígenes, para desarrollo

// Ruta GET para servir el archivo clients.json
app.get('/usuarios', (req, res) => {
    res.sendFile(path.join(__dirname, 'clients.json'));
});

// Escucha en un puerto específico
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
