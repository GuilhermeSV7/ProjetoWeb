const express = require('express');
const router = express.Router();
const path = require('path');
const UserController = require('../controllers/UserController'); // Importe o controlador do usuário

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

// Adicione a rota POST para autenticação
router.post('/login', UserController.login);

router.get('/index', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.post('/register', UserController.register);

// Rota para fazer logout
router.get('/logout', UserController.logout);

const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    // O usuário está autenticado, prossiga
    next();
  } else {
    // O usuário não está autenticado, redirecione para a página de login
    res.redirect('/user/login');
  }
};

// Corrija a rota protegida para redirecionar para '/home' em vez de usar 'res.sendFile'
router.get('/home', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/home.html'));
});

router.get('/profile', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/profile.html'));
});

router.post('/change-password', UserController.changePassword);


module.exports = router;