const express = require('express');
const path = require('path');
const app = express();
const PORT = 4000;

// Middleware pour vérifier les heures de travail
const checkWorkingHours = (req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // 0 = Dimanche, 1 = Lundi, ..., 6 = Samedi
  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res.send('<h1>Hors des heures de travail</h1><p>Lapplication est accessible du lundi au vendredi de 9h à 17h.</p>');
  }
};

// Utiliser le middleware pour toutes les routes
app.use(checkWorkingHours);
app.set('view engine', 'ejs');
// Configurer les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Définir les routes
app.get('/', (req, res) => {
  res.render(path.join(__dirname, 'views', 'index.ejs'));
});

app.get('/services', (req, res) => {
  res.render(path.join(__dirname, 'views', 'services.ejs'));
});

app.get('/contact', (req, res) => {
  res.render(path.join(__dirname, 'views', 'contact.ejs'));
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
