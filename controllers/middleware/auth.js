module.exports = (req, res, next) => {
    if (req.session.userId) {
      // O usuário está autenticado, prossiga
      next();
    } else {
      // O usuário não está autenticado, redirecione para a página de login
      res.redirect('/user/login');
    }
  };
  