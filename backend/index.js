const express = require('express')
const cors = require('cors')
const routes = require('./src/routes/routes')

const app = express()
const port = 5000

//Configuração de CORS para acesso
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials:  true,
  methods: 'GET,PUT,POST,OPTIONS, DELETE',
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./src/models/mainModel");

db.sequelize.sync()
  .then(() => {
    console.log("Sincronizando db");
  })
  .catch((err) => {
    console.log("Falha para reconhecer o db: " + err.message);
  });

//Rotas
app.use(routes)

app.get('/',(req, res )=>{
    res.send('API ONLINE!')
})


app.listen(port, ()=>{
    console.log("SERVIDOR ESTÁ ATIVO")
})