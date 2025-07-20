const express = require('express');
const Firebird = require('node-firebird');

const app = express();
const port = 8888;

const options = {
  host: 'localhost',
  port: 3050,
  database: 'C:/Users/PICHAU/banco/MEU_BANCO.FDB',
  user: 'SYSDBA',
  password: 'masterkey',
  lowercase_keys: false,
  wireCrypt: false
};

app.get('/', (req, res) => {
  res.send('API funcionando!');
});

app.get('/clientes', (req, res) => {
  Firebird.attach(options, (err, db) => {
    if (err) {
      console.error('Erro conexão banco:', err);
      return res.status(500).json({ erro: 'Erro na conexão com o banco' });
    }

    db.query('SELECT * FROM cliente_001', (err, result) => {
      db.detach();

      if (err) {
        console.error('Erro na consulta:', err);
        return res.status(500).json({ erro: 'Erro na consulta SQL' });
      }

      res.json(result);
    });
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
