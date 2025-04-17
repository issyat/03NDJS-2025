import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/connectDB.js';
import authRoutes from './routes/auth.js';

// Charger les variables d'environnement
dotenv.config();

// Connexion à la base de données
connectDB();

// Initialiser l'application Express
const app = express();

// Middleware pour parser le corps des requêtes JSON
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRoutes);

// Route de test
app.get('/', (req, res) => {
  res.send('API Express avec MongoDB et JWT');
});

// 404 Route
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Lancer le serveur
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});