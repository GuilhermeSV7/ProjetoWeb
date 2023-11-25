const Product = require('../models/product');

const ProductController = {
  // Função para exibir a página principal de produtos
  getProductHome: async (req, res) => {
    try {
      // Buscar todos os produtos do banco de dados
      const products = await Product.findAll();

      // Renderizar a página principal de produtos com a lista de itens
      res.render('home', { products });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
    }
  },

  // Função para adicionar um novo item ao banco de dados
  addProduct: async (req, res) => {
    try {
      // Lógica para adicionar um novo item ao banco de dados
      const { itemName, itemPrice } = req.body;
      const newProduct = await Product.create({ name: itemName, price: itemPrice });
      console.log('Novo produto criado:', newProduct);

      // Obtém a lista atualizada de produtos após a adição
      const updatedProducts = await Product.findAll();

      // Retorna a lista de produtos atualizada para o cliente
      res.json(updatedProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
    }
  },


    getProductList: async (req, res) => {
    try {
      const products = await Product.findAll();
      res.render('list', { products });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
    }
  },


  // Função para comprar um item (exemplo simples, você pode adicionar mais lógica aqui)
  buyProduct: async (req, res) => {
    const itemId = req.params.itemId;

    try {
      // Lógica para processar a compra do item (você pode adicionar mais lógica aqui)

      // Redirecionar de volta à página principal de produtos após a compra bem-sucedida
      res.redirect('/product/home');
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
    }
  },

  getProductList: async (req, res) => {
    try {
        const products = await Product.findAll();
        res.render('list', { products });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
    }
},

deleteProduct: async (req, res) => {
  const itemId = req.params.itemId;

  try {
    await Product.destroy({
      where: {
        id: itemId
      }
    });

    const updatedProducts = await Product.findAll();
    res.json(updatedProducts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro interno do servidor.', error: error.message });
  }
},

};

module.exports = ProductController;