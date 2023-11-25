const express = require('express');
const path = require('path');


const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

router.get('/index', (req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

router.get('/login', (req, res) => {
    res.sendFile('login.html', { root: 'public' });
  });

router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/home.html'));
  });

  function viewProfile() {
    // Lógica para exibir o perfil
    console.log('Visualizando o perfil...');
    // Adicione mais lógica conforme necessário
  }
// Adicione rotas para outras páginas conforme necessário

module.exports = router;