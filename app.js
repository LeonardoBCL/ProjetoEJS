const express = require('express');
const app = express();

// Configura o EJS como motor de templates
app.set('view engine', 'ejs');

// Middleware para lidar com dados de formulários (POST)
app.use(express.urlencoded({ extended: true }));

// Removemos os dados simulados de contatos
let contatos = []; // Lista de contatos inicializada vazia

// Rota principal (exibe todos os contatos)
app.get('/', (req, res) => {
  res.render('index', { contatos });
});

// Rota para adicionar um novo contato (exibe o formulário)
app.get('/novo', (req, res) => {
  res.render('new');
});

// Rota para salvar um novo contato (recebe os dados do formulário)
app.post('/add', (req, res) => {
  const { nome, telefone } = req.body;

  // Validação do nome: apenas letras e espaços são permitidos
  const nomeValido = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(nome);
  if (!nomeValido) {
    return res.status(400).send('Nome inválido! Apenas letras e espaços são permitidos.');
  }

  // Validação do telefone: formato (XX) XXXXX-XXXX
  const telefoneValido = /^\(\d{2}\) \d{5}-\d{4}$/.test(telefone);
  if (!telefoneValido) {
    return res.status(400).send('Telefone inválido! O formato correto é (XX) XXXXX-XXXX.');
  }

  // Se as validações passaram, adiciona o novo contato à lista
  contatos.push({ nome, telefone });

  // Redireciona para a página inicial
  res.redirect('/');
});

// Serve arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});
