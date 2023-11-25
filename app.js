const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const userRoutes = require('./router/userRoutes');
const productRoutes = require('./router/productRoutes');
const viewRoutes = require('./router/viewRoutes');
const { Product } = require('./models/product'); // Importe o modelo Product
const path = require('path');
const UserController = require('./controllers/UserController');


// Configurar middleware para servir arquivos estáticos do diretório 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configurar o EJS como mecanismo de visualização
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.post('/user/logout', UserController.logout);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Defina como true se estiver usando HTTPS
}));

// Rotas
app.use('/', viewRoutes);
app.use('/user', userRoutes);
app.use('/product', productRoutes);

// Middleware para lidar com rotas não encontradas
app.use((req, res, next) => {
  res.status(404).send('Página não encontrada!');
});

// Middleware para lidar com erros
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erro interno do servidor!');
});

// Rota para fornecer a lista de produtos
app.get('/product/list', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
  }
});



// Configuração da sessão
app.use(session({
  secret: 'seu_segredo',
  resave: false,
  saveUninitialized: false,
}));

app.listen(8080, () => {
  console.log("Servidor iniciando na porta 8080: http://localhost:8080");
});
