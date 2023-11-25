const User = require('../models/user');
const bcrypt = require('bcrypt');

const UserController = {
  register: async (req, res) => {
    const { username, password } = req.body;

    try {
      // Verificar se o usuário já existe
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        return res.status(409).json({ message: 'Usuário já cadastrado.' });
      }

      // Criar um novo usuário com senha hash
      const hashedPassword = await bcrypt.hash(password, 10); // 10 é o custo do hash
      const newUser = await User.create({ username, password: hashedPassword });

      return res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ where: { username } });
      if (user && (await bcrypt.compare(password, user.password))) {
        // Autenticação bem-sucedida, define o userId na sessão
        req.session.userId = user.id;

        // Redireciona para a página home
        return res.redirect('/user/home');
      } else {
        return res.status(401).json({ message: 'Credenciais inválidas' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
    }
  },

  logout: (req, res) => {
    console.log('Iniciando logout...');
    // Limpar a sessão para fazer logout
    req.session.destroy(err => {
      if (err) {
        console.error('Erro ao destruir sessão:', err);
        return res.status(500).json({ message: 'Erro ao fazer logout.' });
      }
  
      // Redireciona para a página principal após o logout
      console.log('Logout bem-sucedido');
      res.redirect('/public/index.html');
    });
  },


  changePassword: async (req, res) => {
    const { newPassword } = req.body;

    try {
      // Obter o usuário pelo ID da sessão
      const user = await User.findByPk(req.session.userId);

      // Verificar se o usuário existe
      if (!user) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      // Atualizar a senha do usuário
      user.password = await bcrypt.hash(newPassword, 10);
      await user.save();

      return res.status(200).json({ message: 'Senha alterada com sucesso.' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
    }
  },
};

module.exports = UserController;