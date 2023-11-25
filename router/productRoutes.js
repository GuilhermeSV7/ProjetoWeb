const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

// Rota para exibir a página principal de produtos
router.get('/home', ProductController.getProductHome);

// Rota para adicionar um novo item
router.post('/add', ProductController.addProduct);

router.get('/list', ProductController.getProductList)

// Rota para excluir um item
router.get('/delete/:itemId', ProductController.deleteProduct);

// Rota para comprar um item
router.get('/buy/:itemId', ProductController.buyProduct);

router.get('/', (req, res) => {
    res.redirect('/product/home');
  });
router.use(express.json());

router.get('/list', async (req, res) => {
  try {
      const products = await Product.findAll();
      res.json(products);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
  }
});

router.get('/home', async (req, res) => {
    try {
      const products = await Product.findAll();
      // Remova a linha abaixo se você não estiver usando um mecanismo de modelo
      res.render('home', { products });
      // Se não estiver usando um mecanismo de modelo, envie HTML diretamente:
      // res.send(`<html><body>${suaHTMLAqui}</body></html>`);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
    }
  });

  router.get('/buy/:id', async (req, res) => {
    const productId = req.params.id;
    const quantity = req.body.quantity;

    try {

          console.log(`Tentativa de comprar o produto com ID ${productId} e quantidade ${quantity}`);
        // Obter informações do produto pelo productId
        const product = await Product.findByPk(productId);

        if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado.' });
        }

        // Verificar se há estoque suficiente
        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Estoque insuficiente.' });
        }

        // Lógica para processar a compra
        // Exemplo: Atualizar o estoque e registrar a transação no banco de dados
        product.stock -= quantity;
        await product.save();

        // Após o processamento da compra, obtenha os produtos atualizados
        const updatedProducts = await Product.findAll();
        res.json(updatedProducts); // Enviar os produtos atualizados como resposta JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
    }
});

  router.get('/home', async (req, res) => {
    try {
        const products = await Product.findAll();
        res.render('home', { products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
    }
});


  router.get('/list', ProductController.getProductList);

module.exports = router;