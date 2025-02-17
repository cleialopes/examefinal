const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
app.use(express.json()); // Middleware para parsear JSON

// Sirve la carpeta "public" como archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

const filePath = path.join(__dirname, 'data/suscriptores.json');

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'suscripcion.html'));
});

// API: Obtener todos los suscriptores
app.get('/api/suscriptores', async (req, res) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        const suscriptores = JSON.parse(data);
        res.json(suscriptores);
    } catch (error) {
        res.status(500).json({ error: 'Error al leer el archivo' });
    }
});

// API: Añadir un nuevo suscriptor
app.post('/api/suscriptores', async (req, res) => {
    try {
        const newUsuario = req.body;
        const data = await fs.readFile(filePath, 'utf8');

        let usuarios;
        try {
            usuarios = JSON.parse(data);
        } catch (error) {
            return res.status(500).json({ error: 'Error en el formato del archivo JSON' });
        }

        usuarios.push(newUsuario);
        await fs.writeFile(filePath, JSON.stringify(usuarios, null, 2));

        res.json({ message: 'Usuario añadido' });
    } catch (error) {
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

